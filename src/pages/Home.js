import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {
  return (
    <>
      <div className='bg-light p-5 rounded-lg m-3 text-danger h1 text-center'>
        <Jumbotron text={['ÚJDONSÁGOK', 'TOP eladások', 'TOP kedvencek']} />
      </div>

      <h4 className='bg-light p-3 rounded-lg m-3 text-center display-5'>
        ÚJDONSÁGOK
      </h4>
      <NewArrivals />

      <h4 className='bg-light p-3 rounded-lg m-3 text-center display-5'>
        TOP eladások
      </h4>
      <BestSellers />

      <h4 className='bg-light p-3 rounded-lg m-3 text-center display-5'>
        Kategóriák
      </h4>
      <CategoryList />

      <h4 className='bg-light p-3 rounded-lg m-3 text-center display-5'>
        Alkategóriák
      </h4>
      <SubList />
      <br />
    </>
  );
};

export default Home;
