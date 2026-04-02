# Fix: "Unknown" Names in Swaps Page

## Problem
The Swaps page was showing "Unknown" instead of actual user names (requester and receiver names).

## Root Cause
The `SwapsPage.jsx` component was trying to fetch user data from `localStorage` (`skillsync_users`), which doesn't exist or is not populated. The application should fetch user data from the API instead.

## Solution

### Fixed File: `src/pages/swaps/SwapsPage.jsx`

**Before:**
```javascript
const data = await api.getSwapsByUser(user.id);
// Fetch user details for each swap
const users = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
const swapsWithUsers = data.map(swap => {
    const requester = users.find(u => u.id === swap.requesterId);
    const receiver = users.find(u => u.id === swap.receiverId);
    return {
        ...swap,
        requesterName: requester?.name || 'Unknown',
        receiverName: receiver?.name || 'Unknown',
    };
});
```

**After:**
```javascript
const data = await api.getSwapsByUser(user.id);

// Fetch user details for each unique user ID in swaps
const userIds = new Set();
data.forEach(swap => {
    userIds.add(swap.requesterId);
    userIds.add(swap.receiverId);
});

// Fetch all user details from API
const userDetailsPromises = Array.from(userIds).map(id => 
    api.getUserById(id).catch(err => {
        console.error(`Failed to fetch user ${id}:`, err);
        return null;
    })
);

const userDetails = await Promise.all(userDetailsPromises);
const usersMap = {};
userDetails.forEach(user => {
    if (user) {
        usersMap[user.id] = user;
    }
});

// Map swaps with user names
const swapsWithUsers = data.map(swap => ({
    ...swap,
    requesterName: usersMap[swap.requesterId]?.name || 'Unknown',
    receiverName: usersMap[swap.receiverId]?.name || 'Unknown',
}));
```

### Also Fixed: `src/pages/admin/AdminDashboard.jsx`

Changed from using `localStorage` to fetching data from the API using `api.getAllUsers()`.

## How It Works Now

1. **Fetch Swaps:** Get all swaps for the current user
2. **Extract User IDs:** Collect all unique requester and receiver IDs
3. **Fetch User Details:** Make parallel API calls to get user information for each ID
4. **Map Names:** Create a lookup map and assign names to each swap
5. **Display:** Show actual user names instead of "Unknown"

## Benefits

- ✅ Shows actual user names (requester and receiver)
- ✅ Uses real-time data from the API
- ✅ No dependency on localStorage
- ✅ Handles errors gracefully (shows "Unknown" only if API call fails)
- ✅ Efficient parallel fetching of user data

## Testing

To verify the fix:

1. **Login** to your account
2. **Go to Swaps page** (`/swaps`)
3. **Check swap cards** - should now show actual names instead of "Unknown"
4. **Click on names** - should link to user profiles

## Example Output

**Before:**
```
From: Unknown → To: Unknown
```

**After:**
```
From: John Doe → To: Jane Smith
```

## Related Files Modified

1. `src/pages/swaps/SwapsPage.jsx` - Fixed swap user name display
2. `src/pages/admin/AdminDashboard.jsx` - Fixed admin dashboard to use API

## No Backend Changes Required

The backend API already provides all necessary endpoints:
- `GET /api/users/{id}` - Get user by ID
- `GET /api/swaps/user/{id}` - Get swaps for user

The fix was entirely on the frontend side.
