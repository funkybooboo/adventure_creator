import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/userSlice';

// Define the type for the state
interface RootState {
    user: { user: { id: number; name: string } | null };
}

const UserProfile = () => {
    const dispatch = useDispatch();

    // Access the user state from the Redux store
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        // Simulate fetching user data from an API or local storage
        const fetchedUser = { id: 1, name: 'John Doe' };

        // Set user data in the Redux store
        dispatch(setUser(fetchedUser));

        // Cleanup: Clear user on unmount (example)
        return () => {
            dispatch(clearUser());
        };
    }, [dispatch]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
        </div>
    );
};

export default UserProfile;
