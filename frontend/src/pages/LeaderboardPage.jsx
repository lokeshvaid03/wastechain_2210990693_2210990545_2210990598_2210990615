import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Crown } from 'lucide-react';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';

const LEVEL_COLORS = {
  'Eco Starter': 'bg-gray-400',
  'Eco Warrior': 'bg-blue-500',
  'Green Champion': 'bg-green-500',
  'Recycling Hero': 'bg-purple-500',
};

const rankIcon = (i) => {
  if (i === 0) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (i === 1) return <Medal className="w-5 h-5 text-gray-400" />;
  if (i === 2) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-gray-500 font-bold w-5 text-center">{i + 1}</span>;
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAPI.getLeaderboard()
      .then(({ data }) => setLeaders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const myRank = leaders.findIndex(l => l._id === user?._id);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Top recyclers in the WasteChain community</p>

          {myRank >= 0 && (
            <Card className="mb-6 border-2 border-primary-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600 font-bold text-lg">#{myRank + 1}</span>
                  <div>
                    <p className="font-bold">{user?.name} <span className="text-xs text-primary-500">(You)</span></p>
                    <p className="text-sm text-gray-500">{user?.level}</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary-600">{user?.points} pts</span>
              </div>
            </Card>
          )}

          <Card>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              <div className="space-y-3">
                {leaders.map((leader, i) => (
                  <div
                    key={leader._id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      leader._id === user?._id
                        ? 'bg-primary-50 dark:bg-primary-900'
                        : i < 3 ? 'bg-gray-50 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 flex justify-center">{rankIcon(i)}</div>
                      <div className={`w-8 h-8 rounded-full ${LEVEL_COLORS[leader.level] || 'bg-gray-400'} flex items-center justify-center text-white text-xs font-bold`}>
                        {leader.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{leader.name}{leader._id === user?._id && <span className="text-xs text-primary-500 ml-1">(You)</span>}</p>
                        <p className="text-xs text-gray-500">{leader.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">{leader.points} pts</p>
                      <p className="text-xs text-gray-500">{leader.badges?.length || 0} badges</p>
                    </div>
                  </div>
                ))}
                {leaders.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No citizens yet. Be the first!</p>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
