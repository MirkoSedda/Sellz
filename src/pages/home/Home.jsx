
import Container from "react-bootstrap/Container";
import NewProducts from '../../components/home/NewProducts';
import BestSellers from '../../components/home/BestSellers';
import CategoriesList from '../../components/categories/CategoriesList';
import SubCategoriesList from '../../components/subCategories/SubCategoriesList';

const Home = () => {
    return (
        <Container fluid>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                New Products
            </h4>
            <NewProducts />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Best Sellers
            </h4>
            <BestSellers />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Categories
            </h4>
            <CategoriesList />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Sub Categories
            </h4>
            <SubCategoriesList />

            <br />
            <br />
        </Container>
    );
};

export default Home;
