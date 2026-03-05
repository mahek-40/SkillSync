import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { MapPin, Star, MessageCircle, Calendar, Award, ArrowLeft, TrendingUp, Clock } from 'lucide-react';

export function UserProfilePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuthStore();
    const [profileUser, setProfileUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await api.getUserById(userId);
                const userReviews = await api.getUserReviews(userId);
                setProfileUser(userData);
                setReviews(userReviews);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleRequestSwap = async () => {
        try {
            await api.createSwap({
                requesterId: currentUser.id,
                receiverId: userId,
                requesterSkills: currentUser.skillsOffered,
                receiverSkills: profileUser?.skillsOffered || [],
            });
            toast.success('Swap request sent!');
        } catch (error) {
            console.error('Error creating swap:', error);
            toast.error('Failed to send swap request');
        }
    };

    const handleSubmitReview = async () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        if (!reviewText.trim()) {
            toast.error('Please write a review');
            return;
        }

        setSubmitting(true);
        try {
            const newReview = await api.createReview({
                reviewerId: currentUser.id,
                reviewedUserId: userId,
                rating,
                comment: reviewText,
            });
            setReviews([newReview, ...reviews]);
            setRating(0);
            setReviewText('');
            toast.success('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner />
            </DashboardLayout>
        );
    }

    if (!profileUser) {
        return (
            <DashboardLayout>
                <div className="text-center py-12">
                    <p className="text-neutral-600">User not found</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-8">
                {/* Back Button */}
                <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-neutral-100 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Browse
                </Button>

                {/* Profile Header - Clean & Simple */}
                <Card className="shadow-lg">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <Avatar src={profileUser.avatar} alt={profileUser.name} size="xl" className="ring-2 ring-secondary" />
                            
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-primary mb-2">
                                    {profileUser.name}
                                </h1>
                                {profileUser.location && (
                                    <div className="flex items-center gap-2 text-primary/60 mb-4">
                                        <MapPin className="w-4 h-4" />
                                        <span>{profileUser.location}</span>
                                    </div>
                                )}
                                
                                {/* Stats Row */}
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-accent fill-accent" />
                                        <span className="font-bold text-lg text-primary">{averageRating}</span>
                                        <span className="text-primary/60">({reviews.length} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary/60">
                                        <Award className="w-5 h-5" />
                                        <span className="font-semibold">{profileUser.completedSwaps || 0} Swaps Completed</span>
                                    </div>
                                </div>
                                
                                {profileUser.bio && (
                                    <p className="text-primary/70 leading-relaxed">{profileUser.bio}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {currentUser.id !== userId && (
                            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-secondary">
                                <Button 
                                    variant="primary" 
                                    onClick={handleRequestSwap} 
                                    className="flex-1"
                                >
                                    Request Skill Swap
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    className="flex-1"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Skills Section - Enhanced Design */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Skills Offered */}
                    <Card className="border-2 border-brand/20 hover:border-brand/40 transition-all hover:shadow-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-brand/10 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-brand" />
                                </div>
                                <h2 className="text-2xl font-bold text-primary">
                                    Skills I Can Teach
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {profileUser.skillsOffered?.map((skill, index) => (
                                    <Badge key={index} variant="offered" className="text-sm px-4 py-2 hover:scale-110 transition-transform cursor-default shadow-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills Wanted */}
                    <Card className="border-2 border-secondary hover:border-secondary/60 transition-all hover:shadow-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-secondary/30 rounded-lg">
                                    <Star className="w-6 h-6 text-brand" />
                                </div>
                                <h2 className="text-2xl font-bold text-primary">
                                    Skills I Want to Learn
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {profileUser.skillsWanted?.map((skill, index) => (
                                    <Badge key={index} variant="wanted" className="text-sm px-4 py-2 hover:scale-110 transition-transform cursor-default shadow-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Details - Info Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {profileUser.experienceLevel && (
                        <Card className="hover:shadow-xl transition-all border-l-4 border-l-brand">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-brand/10 rounded-lg">
                                        <Award className="w-5 h-5 text-brand" />
                                    </div>
                                    <p className="text-sm font-medium text-primary/60">Experience Level</p>
                                </div>
                                <p className="text-2xl font-bold capitalize text-primary ml-11">{profileUser.experienceLevel}</p>
                            </CardContent>
                        </Card>
                    )}
                    
                    <Card className="hover:shadow-xl transition-all border-l-4 border-l-accent">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <Award className="w-5 h-5 text-accent" />
                                </div>
                                <p className="text-sm font-medium text-primary/60">Completed Swaps</p>
                            </div>
                            <p className="text-2xl font-bold text-primary ml-11">{profileUser.completedSwaps || 0}</p>
                        </CardContent>
                    </Card>
                    
                    {profileUser.availability && profileUser.availability.length > 0 && (
                        <Card className="hover:shadow-xl transition-all border-l-4 border-l-secondary">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-secondary/30 rounded-lg">
                                        <Clock className="w-5 h-5 text-brand" />
                                    </div>
                                    <p className="text-sm font-medium text-primary/60">Availability</p>
                                </div>
                                <p className="text-lg font-semibold text-primary ml-11">{profileUser.availability.join(', ')}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Reviews Section - Enhanced */}
                <Card className="shadow-xl">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-accent/10 rounded-xl">
                                <Star className="w-7 h-7 text-accent fill-accent" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary">
                                    Ratings & Reviews
                                </h2>
                                <p className="text-primary/60">{reviews.length} total reviews</p>
                            </div>
                        </div>

                        {/* Add Review (only if not viewing own profile) */}
                        {currentUser.id !== userId && (
                            <div className="mb-8 p-6 bg-gradient-to-br from-secondary/20 to-brand/10 rounded-xl border-2 border-secondary/50">
                                <h3 className="font-semibold text-lg mb-4 text-primary">Write a Review</h3>
                                <div className="flex gap-2 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-all hover:scale-125 active:scale-110"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${
                                                    star <= rating
                                                        ? 'text-accent fill-accent drop-shadow-lg'
                                                        : 'text-secondary hover:text-accent'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <Textarea
                                    placeholder="Share your experience with this user..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    rows={4}
                                    className="mb-4 border-2 focus:border-brand"
                                />
                                <Button
                                    variant="primary"
                                    onClick={handleSubmitReview}
                                    disabled={submitting}
                                    className="px-6 py-2"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </Button>
                            </div>
                        )}

                        {/* Reviews List */}
                        <div className="space-y-5">
                            {reviews.length === 0 ? (
                                <div className="text-center py-12 bg-base rounded-xl">
                                    <Star className="w-12 h-12 text-secondary mx-auto mb-3" />
                                    <p className="text-primary/60 font-medium">No reviews yet</p>
                                    <p className="text-sm text-primary/40">Be the first to review this user!</p>
                                </div>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="p-5 bg-white border-2 border-secondary/30 rounded-xl hover:border-brand/30 hover:shadow-lg transition-all">
                                        <div className="flex items-start gap-4">
                                            <Avatar src={review.reviewerAvatar} alt={review.reviewerName} size="md" className="ring-2 ring-secondary/30" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-semibold text-lg text-primary">{review.reviewerName}</p>
                                                    <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                                                        <Star className="w-4 h-4 text-accent fill-accent" />
                                                        <span className="font-bold text-accent">{review.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-primary/70 leading-relaxed mb-2">{review.comment}</p>
                                                <p className="text-xs text-primary/40 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
