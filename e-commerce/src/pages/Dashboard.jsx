import React from 'react'
import Card from '../components/Card'
import ScarletRomance from '../assets/images/ScarletRomance.jpg'
import BlushingLove from '../assets/images/BlushingLove.jpg'
import GoldenGlow from '../assets/images/GoldenGlow.jpg'
import SummerCharm from '../assets/images/SummerCharm.jpg'
import SunshineBliss from '../assets/images/SunshineBliss.jpg'
import TulipDream from '../assets/images/TulipDream.jpg'
import PureElegance from '../assets/images/TulipDream.jpg'





const Dashboard = () => {
    return (
        <div className="card-container">

            <Card image={ScarletRomance} name="Scarlet Romance" price={1200} />
            <Card image={BlushingLove} name="Blushing Love"  price={1350}/>
            <Card image={PureElegance} name="Pure Elegance" price={1400}/>
            <Card image={SunshineBliss} name="Sunshine Bliss" price={1500}/>
            <Card image={GoldenGlow} name="Golden Glow" price={1450}/>
            <Card image={SummerCharm} name="Summer Charm" price={1650}/>
            <Card image={TulipDream} name="Tulip Dream" price={2500}/>
            
            
        </div>
    )
}

export default Dashboard