// next
import {getServerSession} from 'next-auth';
// routes
import {authOptions} from '../api/auth/[...nextauth]/route';

export default async function getSession() {
  return await getServerSession(authOptions);
}
