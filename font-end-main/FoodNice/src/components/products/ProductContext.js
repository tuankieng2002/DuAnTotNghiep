// import React, {useState, createContext} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getProducts,getProductById} from './ProductService';
// import constants from '../../utils/constants';

// export const ProductContext = createContext();

// export const ProductContextProvider = (props) =>{
//     const {children} = props;

//     const [products,setProducts] = useState([]);
//     const [product,setProduct] = useState({});

//     const onGetProducts = async (email,password) =>{
//         try {
//             const result = await getProducts();
//             setProducts(result);
//         } catch (error) {
//             console.log('onLogin error:',error)
//         }
//     }

//     const onGetProductById = async (id) =>{
//         try {
//             const result = await getProductById(id);
//             setProduct(result);
//         } catch (error) {
//             console.log('onRegister error: ',error)
//         }
//         return false;
//     }

//     return(
//         <ProductContext.Provider
//             value ={{
//                 onGetProducts, onGetProductById, product, products
                
//             }}
//         >
//             {children}
//         </ProductContext.Provider>

//     );
// };