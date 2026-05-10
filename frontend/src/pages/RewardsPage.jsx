import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI, rewardsAPI } from '../services/api';
import { socket } from '../services/api';
import { Award, Trophy, Star, Target, Leaf, Zap, Wind, Gift, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

const CATEGORY_POINTS = { Plastic: 10, Paper: 8, Metal: 20, Glass: 12, 'E-waste': 25, Organic: 5, Other: 5 };
const AVG_POINTS_PER_KG = Object.values(CATEGORY_POINTS).reduce((a, b) => a + b, 0) / Object.keys(CATEGORY_POINTS).length;
const KG_PER_POINT = 1 / AVG_POINTS_PER_KG;
const CO2_PER_KG = 2.5;
const TREES_PER_100KG = 1;

const CATEGORY_ICONS = { discount: Gift, impact: Leaf, pickup: Zap };

export default function RewardsPage() {
  const { user, setUser } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [myRedemptions, setMyRedemptions] = useState([]);
  const [redeeming, setRedeeming] = useState(null);
  const [lastCoupon, setLastCoupon] = useState(null);

  const fetchProfile = () => authAPI.getProfile().then(({ data }) => setUser(data)).catch(() => {});
  const fetchRewards = () => rewardsAPI.getRewards().then(({ data }) => {
    setRewards(data.rewards);
    setMyRedemptions(data.myRedemptions);
  }).catch(() => {});

  useEffect(() => { fetchProfile(); fetchRewards(); }, []);
  useEffect(() => {
    socket.on('wasteStatusUpdate', fetchProfile);
    return () => socket.off('wasteStatusUpdate', fetchProfile);
  }, []);

  const levels = [
    { name: 'Eco Starter', minPoints: 0, color: 'bg-gray-500' },
    { name: 'Eco Warrior', minPoints: 50, color: 'bg-blue-500' },
    { name: 'Green Champion', minPoints: 200, color: 'bg-green-500' },
    { name: 'Recycling Hero', minPoints: 500, color: 'bg-purple-500' },
  ];

  const currentLevel = levels.find(l => l.name === user?.level) || levels[0];
  const nextLevel = levels[levels.findIndex(l => l.name === user?.level) + 1];
  const progress = nextLevel
    ? ((user?.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const allBadges = [
    { name: 'Eco Starter', description: 'Join WasteChain', icon: Star, earned: true },
    { name: 'Eco Warrior', description: 'Earn 50 points', icon: Award, earned: user?.points >= 50 },
    { name: 'Green Champion', description: 'Earn 200 points', icon: Trophy, earned: user?.points >= 200 },
    { name: 'Recycling Hero', description: 'Earn 500 points', icon: Target, earned: user?.points >= 500 },
  ];

  // Impact calculations
  const pts = user?.points || 0;
  const estimatedKg = pts * KG_PER_POINT;
  const co2Saved = (estimatedKg * CO2_PER_KG).toFixed(1);
  const treesEquiv = (estimatedKg / 100 * TREES_PER_100KG).toFixed(2);
  const energySaved = (estimatedKg * 1.8).toFixed(1); // ~1.8 kWh per kg recycled

  const handleRedeem = async (reward) => {
    setRedeeming(reward._id);
    try {
      const { data } = await rewardsAPI.redeem(reward._id);
      toast.success(`Redeemed! Your code: ${data.couponCode}`);
      setLastCoupon({ code: data.couponCode, title: reward.title });
      setUser(prev => ({ ...prev, points: data.pointsRemaining }));
      fetchRewards();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Redemption failed');
    } finally {
      setRedeeming(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Rewards & Achievements</h1>

          {/* Points Card */}
          <Card className="mb-8 bg-gradient-to-br from-primary-500 to-green-600 text-white">
            <div className="text-center py-8">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-5xl font-bold mb-2">{pts}</h2>
              <p className="text-xl">Total Points Earned</p>
            </div>
          </Card>

          {/* Environmental Impact Card */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Leaf className="text-green-500" /> Your Environmental Impact</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <Wind className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{co2Saved} kg</p>
                <p className="text-sm text-gray-500">CO₂ Saved</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                <Leaf className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-emerald-600">{treesEquiv}</p>
                <p className="text-sm text-gray-500">Trees Equivalent</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{energySaved} kWh</p>
                <p className="text-sm text-gray-500">Energy Saved</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Estimates based on average recycling impact per kg of waste</p>
          </Card>

          {/* Redeem Rewards */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2"><Gift className="text-purple-500" /> Redeem Points</h3>
            <p className="text-sm text-gray-500 mb-4">You have <span className="font-bold text-primary-600">{pts} points</span> available</p>

            {lastCoupon && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-300 rounded-xl flex items-center gap-3">
                <CheckCircle className="text-green-500 w-6 h-6 shrink-0" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">{lastCoupon.title} redeemed!</p>
                  <p className="text-sm">Your coupon code: <span className="font-mono font-bold tracking-widest">{lastCoupon.code}</span></p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const Icon = CATEGORY_ICONS[reward.category] || Gift;
                const canAfford = pts >= reward.pointsCost;
                const outOfStock = reward.totalStock !== null && reward.redeemedCount >= reward.totalStock;
                return (
                  <div key={reward._id} className={`p-4 rounded-xl border-2 ${canAfford && !outOfStock ? 'border-primary-300 dark:border-primary-700' : 'border-gray-200 dark:border-gray-700 opacity-60'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{reward.title}</p>
                          <p className="text-xs text-gray-500">{reward.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold">{reward.pointsCost} pts</span>
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford || outOfStock || redeeming === reward._id}
                        className="px-3 py-1.5 text-sm rounded-lg bg-primary-600 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                      >
                        {redeeming === reward._id ? 'Redeeming...' : outOfStock ? 'Out of Stock' : !canAfford ? 'Need more pts' : 'Redeem'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {myRedemptions.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold mb-2 text-sm text-gray-600 dark:text-gray-400">Your Redemption History</p>
                <div className="space-y-2">
                  {myRedemptions.map((r) => (
                    <div key={r._id} className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span>{r.reward?.title}</span>
                      <span className="font-mono text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">{r.couponCode}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Level Progress */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold mb-4">Your Level</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold">{currentLevel.name}</p>
                {nextLevel && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {nextLevel.minPoints - pts} points to {nextLevel.name}
                  </p>
                )}
              </div>
              <div className={`w-16 h-16 ${currentLevel.color} rounded-full flex items-center justify-center text-white`}>
                <Trophy className="w-8 h-8" />
              </div>
            </div>
            {nextLevel && (
              <div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div className="bg-primary-600 h-4 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{progress.toFixed(0)}% to next level</p>
              </div>
            )}
          </Card>

          {/* Badges */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold mb-4">Badges Collection</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {allBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className={`p-4 rounded-lg border-2 ${badge.earned ? 'border-primary-500 bg-primary-50 dark:bg-primary-900' : 'border-gray-300 dark:border-gray-700 opacity-50'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.earned ? 'bg-primary-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold">{badge.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Points Breakdown */}
          <Card>
            <h3 className="text-xl font-bold mb-4">How to Earn Points</h3>
            <div className="space-y-3">
              {Object.entries(CATEGORY_POINTS).map(([category, points]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium">{category}</span>
                  <span className="text-primary-600 font-bold">+{points} points/kg</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
