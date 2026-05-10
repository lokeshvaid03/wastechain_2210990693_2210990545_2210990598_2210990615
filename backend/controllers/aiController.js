const fs = require('fs');
const path = require('path');

const LABEL_MAP = [
  { keys: ['bottle', 'plastic', 'water bottle', 'pop bottle', 'pill bottle', 'plastic bag', 'bucket', 'barrel', 'jug', 'container'], type: 'Plastic', recyclable: true, disposalInstructions: 'Rinse and place in plastic recycling bin. Remove caps if required.', suggestions: ['Crush bottles to save space', 'Check resin code on bottom'] },
  { keys: ['paper', 'newspaper', 'cardboard', 'envelope', 'book', 'notebook', 'carton', 'box', 'tissue', 'magazine'], type: 'Paper', recyclable: true, disposalInstructions: 'Keep dry and place in paper recycling bin.', suggestions: ['Remove staples and tape', 'Flatten cardboard boxes'] },
  { keys: ['can', 'tin', 'metal', 'steel', 'iron', 'aluminum', 'foil', 'nail', 'screw', 'wrench', 'hammer', 'pan', 'pot'], type: 'Metal', recyclable: true, disposalInstructions: 'Rinse cans and place in metal recycling bin.', suggestions: ['Crush cans to save space', 'Remove paper labels if possible'] },
  { keys: ['glass', 'jar', 'wine glass', 'beer glass', 'goblet', 'beaker', 'lens', 'mirror', 'window'], type: 'Glass', recyclable: true, disposalInstructions: 'Rinse and place in glass recycling bin. Do not mix with ceramics.', suggestions: ['Sort by colour if required locally', 'Remove metal lids separately'] },
  { keys: ['phone', 'mobile', 'laptop', 'computer', 'keyboard', 'mouse', 'monitor', 'television', 'tv', 'battery', 'wire', 'cable', 'charger', 'remote', 'camera', 'radio', 'speaker', 'headphone', 'printer', 'circuit', 'hard disk', 'tablet', 'ipad'], type: 'E-waste', recyclable: true, disposalInstructions: 'Take to an authorised e-waste collection centre. Do not bin.', suggestions: ['Wipe personal data before disposal', 'Check manufacturer take-back programmes'] },
  { keys: ['food', 'fruit', 'vegetable', 'banana', 'apple', 'orange', 'lemon', 'broccoli', 'carrot', 'leaf', 'plant', 'flower', 'mushroom', 'egg', 'bread', 'meat', 'fish', 'corn', 'pineapple', 'strawberry', 'grape', 'watermelon', 'pear', 'peach', 'mango', 'salad', 'pizza', 'burger'], type: 'Organic', recyclable: true, disposalInstructions: 'Place in compost or organic waste bin.', suggestions: ['Home composting reduces transport emissions', 'Avoid mixing with non-organic waste'] },
];

function mapLabelsToWaste(labels = []) {
  for (const { label, score } of labels) {
    const lower = label.toLowerCase();
    for (const entry of LABEL_MAP) {
      if (entry.keys.some(k => lower.includes(k))) {
        return { type: entry.type, recyclable: entry.recyclable, disposalInstructions: entry.disposalInstructions, suggestions: entry.suggestions, confidence: Math.round(score * 100), source: 'huggingface' };
      }
    }
  }
  return null;
}

function fallbackPrediction(filename = '') {
  const name = filename.toLowerCase();
  for (const entry of LABEL_MAP) {
    if (entry.keys.some(k => name.includes(k))) {
      return { type: entry.type, recyclable: entry.recyclable, disposalInstructions: entry.disposalInstructions, suggestions: entry.suggestions, source: 'fallback' };
    }
  }
  return {
    type: 'Other', recyclable: false,
    disposalInstructions: 'Inspect item carefully. If unsure, take to a local recycling centre for assessment.',
    suggestions: ['When in doubt, check local recycling guidelines', 'Avoid contaminating recycling bins with non-recyclables'],
    source: 'fallback',
  };
}

exports.analyzeWasteImage = async (req, res) => {
  // Always return 200 — never let this endpoint crash
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const hfKey = process.env.HF_API_KEY;

    if (!hfKey) {
      const prediction = fallbackPrediction(req.file.originalname);
      return res.json({ success: true, prediction, note: 'AI key not configured — used smart fallback.' });
    }

    let imageBuffer;
    try {
      imageBuffer = fs.readFileSync(req.file.path);
    } catch (e) {
      const prediction = fallbackPrediction(req.file.originalname);
      return res.json({ success: true, prediction, note: 'Could not read image — used smart fallback.' });
    }

    let hfResult;
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${hfKey}`,
            'Content-Type': 'application/octet-stream',
          },
          body: imageBuffer,
          signal: AbortSignal.timeout(15000), // 15s timeout
        }
      );

      if (!response.ok) {
        throw new Error(`HF responded ${response.status}`);
      }

      hfResult = await response.json();
    } catch (e) {
      console.error('HuggingFace call failed:', e.message);
      const prediction = fallbackPrediction(req.file.originalname);
      return res.json({ success: true, prediction, note: 'AI service unavailable — used smart fallback.' });
    }

    // hfResult could be an error object from HF (model loading)
    if (!Array.isArray(hfResult)) {
      console.error('HF unexpected response:', JSON.stringify(hfResult));
      const prediction = fallbackPrediction(req.file.originalname);
      return res.json({ success: true, prediction, note: 'AI model loading — used smart fallback.' });
    }

    const prediction = mapLabelsToWaste(hfResult) || fallbackPrediction(req.file.originalname);
    const note = prediction.source === 'fallback' ? 'Could not confidently classify — used smart fallback.' : null;

    return res.json({ success: true, imageUrl: `/uploads/${req.file.filename}`, prediction, note });

  } catch (err) {
    // Absolute last resort — never return 500
    console.error('analyzeWasteImage unexpected error:', err.message);
    const prediction = fallbackPrediction(req.file?.originalname || '');
    return res.json({ success: true, prediction, note: 'Unexpected error — used smart fallback.' });
  }
};
