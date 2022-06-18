import React, { useState, useEffect } from 'react';
import "./css/PlanScreen.css";
import db from '../../firebase';
import {selectuser} from "../../features/userSlice";
import {useSelector} from 'react-redux';
import {loadStripe} from "@stripe/stripe-js";


function PlanScreen() {
    const[products, setProducts] = useState([]);
    const user = useSelector(selectuser);
    const [subscription, setSubscription]=useState(null);
    useEffect(() => {
      db.collection("consumer")
      .doc(user.uid)
      .collection('subscription')
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(async subscription=>{
          setSubscription({
            role:subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start
           .seconds,
          });

        });
      });
    
     
    }, [user.uid])
    
    useEffect(() => {
      db.collection ("products").where("active", "==", true)
      .get()
      .then((querySnapshot) =>{
         const products={};
         querySnapshot.forEach(async productDoc =>{
           products[productDoc.id]=productDoc.data();
           const priceSnap =await productDoc.ref.conllection("prices").get();
           priceSnap.docs.forEach(price => {
             products[productDoc.id].prices={
               priceId:price.id,
               priceData: price.data()
             };
           });
         });
         setProducts(products);
      });
    
     
    }, [])
    console.log(products)

    const loadCheckout = async (priceId)=>{
      const docRef= await db
      .collection('consumer')
      .doc(user.uid)
      .collection("checkout__sessions")
      .add({
        price: priceId,
        success_url:window.location.origin,
        cancel_url: window.location.origin,

      })
      docRef.onSnapshot(async(snap)=>{
        // destruction the snap.data into erro and sessionId
        const {error, sessionId} = snap.data();
        if (error){
          // show an error to your customer and 
          // inspect your Cloud Function logs un the Firebase console.
          alert(`An error occured:${error.message}`);

        }
        if (sessionId){
          // we have a session, let's redirect to checkout
          // Init Stripe
          const stripe= await loadStripe();
          stripe.redirectToCheckout({ sessionId})
        }
      });

    };
    
  return (
    <div className="planScreen">
      <br/>
      {subscription && <p>Renewal Date: {new Date (subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData])=>{
        // add some logic to check if the user's subscription is active..
        const isCurrentPackage=productData.name?.toLowerCase().includes(subscription?.role);
        return (
         
          <div 
            key={productId}
            className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen_plan}`}>
            <div className='planScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={()=>
              !isCurrentPackage &&  
              loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? 'current package': 'subscribe'}</button>
          </div>

        );
      })}
    </div>
  )
    
  
}

export default PlanScreen;