import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../ui/Card';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { MapPin, Calendar } from 'lucide-react';

export function SkillCard({ user, onRequestSwap, currentSwapStatus }) {
    const [isPending, setIsPending] = useState(currentSwapStatus === 'pending');

    const handleRequestSwap = async () => {
        setIsPending(true);
        await onRequestSwap(user.id);
    };

    const handleCancel = () => {
        setIsPending(false);
        // In production, this would call an API to cancel the swap
    };

    return (
        <Card className="h-full flex flex-col bg-white border border-secondary/50 hover:border-brand/30 hover:shadow-soft-lg transition-all">
            <CardContent className="flex flex-col h-full p-6">
                {/* User Info */}
                <div className="flex items-start gap-4 mb-4">
                    <Link to={`/user/${user.id}`}>
                        <Avatar src={user.avatar} alt={user.name} size="lg" className="cursor-pointer hover:ring-2 hover:ring-brand transition-all" />
                    </Link>
                    <div className="flex-1 min-w-0">
                        <Link to={`/user/${user.id}`}>
                            <h3 className="font-semibold text-lg text-primary truncate hover:text-brand transition-colors cursor-pointer">
                                {user.name}
                            </h3>
                        </Link>
                        {user.location && (
                            <div className="flex items-center gap-1 text-sm text-primary/60 mt-1">
                                <MapPin className="w-4 h-4" />
                                <span className="truncate">{user.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bio */}
                <div className="flex-1">
                    {user.bio && (
                        <p className="text-sm text-primary/60 mb-4 line-clamp-2">
                            {user.bio}
                        </p>
                    )}

                    {/* Skills Offered */}
                    {user.skillsOffered && user.skillsOffered.length > 0 && (
                        <div className="mb-3">
                            <p className="text-xs font-medium text-primary/50 mb-2">Offers</p>
                            <div className="flex flex-wrap gap-2">
                                {user.skillsOffered.slice(0, 3).map((skill, index) => (
                                    <Badge key={index} variant="offered">
                                        {skill}
                                    </Badge>
                                ))}
                                {user.skillsOffered.length > 3 && (
                                    <Badge variant="default">+{user.skillsOffered.length - 3}</Badge>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Skills Wanted */}
                    {user.skillsWanted && user.skillsWanted.length > 0 && (
                        <div className="mb-3">
                            <p className="text-xs font-medium text-primary/50 mb-2">Wants</p>
                            <div className="flex flex-wrap gap-2">
                                {user.skillsWanted.slice(0, 3).map((skill, index) => (
                                    <Badge key={index} variant="wanted">
                                        {skill}
                                    </Badge>
                                ))}
                                {user.skillsWanted.length > 3 && (
                                    <Badge variant="default">+{user.skillsWanted.length - 3}</Badge>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Availability */}
                    {user.availability && user.availability.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-primary/60">
                            <Calendar className="w-4 h-4" />
                            <span className="truncate">{user.availability.join(', ')}</span>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-secondary">
                    {isPending ? (
                        <div className="space-y-2">
                            <Button variant="secondary" className="w-full" disabled>
                                Request Pending
                            </Button>
                            <button
                                onClick={handleCancel}
                                className="w-full text-sm text-primary/60 hover:text-red-600 transition-colors"
                            >
                                Cancel Request
                            </button>
                        </div>
                    ) : (
                        <Button variant="primary" className="w-full" onClick={handleRequestSwap}>
                            Request Swap
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
