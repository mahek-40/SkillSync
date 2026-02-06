import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, MessageCircle, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/common/EmptyState';
import Header from '@/components/layout/Header';

const SwapsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  
  // Mock data - replace with API
  const swapRequests = {
    incoming: [
      {
        id: 1,
        requester: {
          name: 'Marcus Johnson',
          avatar: null,
          rating: 5.0,
        },
        skillOffered: 'Guitar Lessons',
        skillWanted: 'Web Development',
        message: 'Hi! I would love to learn web development from you. I can teach you guitar in return.',
        date: '2 hours ago',
        status: 'pending',
      },
      {
        id: 2,
        requester: {
          name: 'Lisa Anderson',
          avatar: null,
          rating: 4.8,
        },
        skillOffered: 'Yoga & Meditation',
        skillWanted: 'Graphic Design',
        message: 'Looking forward to exchanging skills!',
        date: '1 day ago',
        status: 'pending',
      },
    ],
    outgoing: [
      {
        id: 3,
        receiver: {
          name: 'Sarah Chen',
          avatar: null,
          rating: 4.9,
        },
        skillOffered: 'React Development',
        skillWanted: 'UI Design',
        date: '3 hours ago',
        status: 'accepted',
      },
      {
        id: 4,
        receiver: {
          name: 'Alex Kumar',
          avatar: null,
          rating: 4.9,
        },
        skillOffered: 'Python',
        skillWanted: 'Content Writing',
        date: '5 hours ago',
        status: 'pending',
      },
    ],
    active: [
      {
        id: 5,
        partner: {
          name: 'Sarah Chen',
          avatar: null,
          rating: 4.9,
        },
        skill: 'React Development',
        nextSession: 'Tomorrow at 3:00 PM',
        progress: 60,
      },
    ],
    completed: [
      {
        id: 6,
        partner: {
          name: 'Emily Rodriguez',
          avatar: null,
          rating: 4.8,
        },
        skill: 'Spanish Lessons',
        completedDate: '2 weeks ago',
        reviewed: true,
      },
    ],
  };
  
  const tabs = [
    { id: 'incoming', label: 'Incoming', count: swapRequests.incoming.length },
    { id: 'outgoing', label: 'Sent', count: swapRequests.outgoing.length },
    { id: 'active', label: 'Active', count: swapRequests.active.length },
    { id: 'completed', label: 'Completed', count: swapRequests.completed.length },
  ];
  
  const handleAccept = (id) => {
    toast.success('Swap request accepted!');
    // API call
  };
  
  const handleReject = (id) => {
    toast.info('Swap request rejected');
    // API call
  };
  
  const handleCancel = (id) => {
    toast.info('Swap request cancelled');
    // API call
  };
  
  const renderIncomingRequests = () => {
    if (swapRequests.incoming.length === 0) {
      return (
        <EmptyState
          icon={Clock}
          title="No incoming requests"
          description="When someone requests a swap with you, it will appear here."
        />
      );
    }
    
    return (
      <div className="space-y-4">
        {swapRequests.incoming.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar 
                  src={request.requester.avatar}
                  fallback={request.requester.name}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {request.requester.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {request.date}
                      </p>
                    </div>
                    <Badge variant="pending">Pending</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 my-4">
                    <div className="bg-mint-50 p-4 rounded-xl">
                      <p className="text-sm text-text-secondary mb-1">They offer</p>
                      <p className="font-medium text-brand-mint">
                        {request.skillOffered}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <p className="text-sm text-text-secondary mb-1">They want</p>
                      <p className="font-medium text-brand-purple">
                        {request.skillWanted}
                      </p>
                    </div>
                  </div>
                  
                  {request.message && (
                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                      <p className="text-sm text-text-secondary italic">
                        "{request.message}"
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleAccept(request.id)}
                      variant="secondary"
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderOutgoingRequests = () => {
    if (swapRequests.outgoing.length === 0) {
      return (
        <EmptyState
          icon={Clock}
          title="No sent requests"
          description="Requests you send will appear here."
        />
      );
    }
    
    return (
      <div className="space-y-4">
        {swapRequests.outgoing.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar 
                  src={request.receiver.avatar}
                  fallback={request.receiver.name}
                  size="lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {request.receiver.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Sent {request.date}
                      </p>
                    </div>
                    <Badge variant={request.status === 'accepted' ? 'accepted' : 'pending'}>
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-mint-50 p-4 rounded-xl">
                      <p className="text-sm text-text-secondary mb-1">You offer</p>
                      <p className="font-medium text-brand-mint">
                        {request.skillOffered}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <p className="text-sm text-text-secondary mb-1">You want</p>
                      <p className="font-medium text-brand-purple">
                        {request.skillWanted}
                      </p>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <Button
                      onClick={() => handleCancel(request.id)}
                      variant="danger"
                      className="w-full"
                    >
                      Cancel Request
                    </Button>
                  )}
                  
                  {request.status === 'accepted' && (
                    <Button variant="primary" className="w-full">
                      <MessageCircle className="w-4 h-4" />
                      Message Partner
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderActiveSwaps = () => {
    if (swapRequests.active.length === 0) {
      return (
        <EmptyState
          icon={Calendar}
          title="No active swaps"
          description="Accepted swap requests will appear here."
        />
      );
    }
    
    return (
      <div className="space-y-4">
        {swapRequests.active.map((swap) => (
          <Card key={swap.id} className="bg-gradient-to-br from-purple-50 to-mint-50 border-0">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar 
                  src={swap.partner.avatar}
                  fallback={swap.partner.name}
                  size="lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {swap.partner.name}
                  </h3>
                  <p className="text-brand-purple font-medium mb-4">
                    {swap.skill}
                  </p>
                  
                  <div className="bg-white rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">Progress</span>
                      <span className="text-sm font-medium">{swap.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-purple rounded-full transition-all"
                        style={{ width: `${swap.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>Next session: {swap.nextSession}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="primary" className="flex-1">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderCompletedSwaps = () => {
    if (swapRequests.completed.length === 0) {
      return (
        <EmptyState
          icon={CheckCircle}
          title="No completed swaps"
          description="Completed skill exchanges will appear here."
        />
      );
    }
    
    return (
      <div className="space-y-4">
        {swapRequests.completed.map((swap) => (
          <Card key={swap.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar 
                  src={swap.partner.avatar}
                  fallback={swap.partner.name}
                  size="lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {swap.partner.name}
                      </h3>
                      <p className="text-brand-purple font-medium">
                        {swap.skill}
                      </p>
                    </div>
                    <Badge variant="completed">Completed</Badge>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-4">
                    Completed {swap.completedDate}
                  </p>
                  
                  {swap.reviewed ? (
                    <div className="bg-mint-50 p-4 rounded-xl">
                      <p className="text-sm text-mint-700">
                        ✓ You've reviewed this exchange
                      </p>
                    </div>
                  ) : (
                    <Button variant="primary" className="w-full">
                      Leave a Review
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-bg-cream to-bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display font-bold mb-2">
              My <span className="gradient-text">Swap Requests</span>
            </h1>
            <p className="text-text-secondary text-lg">
              Manage your skill exchange requests and active swaps
            </p>
          </motion.div>
          
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-soft p-2 mb-6">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-purple text-white shadow-md'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-100'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'incoming' && renderIncomingRequests()}
            {activeTab === 'outgoing' && renderOutgoingRequests()}
            {activeTab === 'active' && renderActiveSwaps()}
            {activeTab === 'completed' && renderCompletedSwaps()}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SwapsPage;