import { useSelector } from 'react-redux';
import PastOrders from '../components/pastOrders';

const Profile = () => {
  const { loading } = useSelector((store) => store.user);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center pt-20 text-fluorescent-cyan">
      <h1>YOUR ORDERS:</h1>
      <PastOrders />
    </section>
  );
};

export default Profile;
