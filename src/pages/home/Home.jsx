
import Container from "react-bootstrap/Container";
import NewProducts from '../../components/home/NewProducts';
import BestSellers from '../../components/home/BestSellers';
import CategoriesList from '../../components/categories/CategoriesList';
import SubCategoriesList from '../../components/subCategories/SubCategoriesList';
import MyCarousel from "../../components/carousel/MyCarousel";

const Home = () => {

    return (
        <Container fluid>

            <MyCarousel />

            <h4 className="text-center p-3 mt-5 mb-2 display-4">
                New Products
            </h4>
            <NewProducts />

            <h4 className="text-center p-3 mt-5 mb-2 display-4">
                Best Sellers
            </h4>
            <BestSellers />

            <h4 className="text-center p-3 mt-5 mb-2 display-4">
                Categories
            </h4>
            <CategoriesList />

            <h4 className="text-center p-3 mt-5 mb-2 display-4">
                Sub Categories
            </h4>
            <SubCategoriesList />

            <br />
            <br />
        </Container>
    );
};

export default Home;
