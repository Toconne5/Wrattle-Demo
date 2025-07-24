import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FriendRequest, Friend, UserProfile } from '../types/friends';

export const friendsService = {
  // Send friend request
  async sendFriendRequest(fromUserId: string, toUserEmail: string, fromUserName: string, fromUserEmail: string) {
    try {
      const friendRequest: Omit<FriendRequest, 'id'> = {
        fromUserId,
        toUserId: toUserEmail, // Using email as identifier for now
        fromUserName,
        fromUserEmail,
        status: 'pending',
        createdAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, 'friendRequests'), friendRequest);
      return docRef.id;
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  },

  // Get pending friend requests for a user
  async getPendingFriendRequests(userEmail: string) {
    try {
      const q = query(
        collection(db, 'friendRequests'),
        where('toUserId', '==', userEmail),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FriendRequest[];
    } catch (error) {
      console.error('Error getting friend requests:', error);
      throw error;
    }
  }, // <-- ADDED MISSING COMMA HERE

  // Accept a friend request
  async acceptFriendRequest(requestId: string, userId: string, friendId: string) {
    try {
      // Update the friend request status
      const requestRef = doc(db, 'friendRequests', requestId);
      await updateDoc(requestRef, {
        status: 'accepted'
      });

      // Add to friends collection (both directions)
      const friendsRef = collection(db, 'friends');
      
      // Add friend relationship
      await addDoc(friendsRef, {
        userId,
        friendId,
        createdAt: new Date()
      });

      // Add reverse relationship
      await addDoc(friendsRef, {
        userId: friendId,
        friendId: userId,
        createdAt: new Date()
      });

      return true;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      throw error;
    }
  },

  // Reject a friend request
  async rejectFriendRequest(requestId: string) {
    try {
      const requestRef = doc(db, 'friendRequests', requestId);
      await updateDoc(requestRef, {
        status: 'rejected'
      });
      return true;
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      throw error;
    }
  },

  // Get user's friends list
  async getFriends(userId: string): Promise<Friend[]> {
    try {
      const q = query(
        collection(db, 'friends'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || new Date()
      })) as Friend[];
    } catch (error) {
      console.error('Error getting friends:', error);
      return [];
    }
  }
};