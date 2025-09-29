import NavBar from '../components/Layout/NavBar'
import HomePage from './HomePage'
import ClientsSection from './PartnersSection'

import ActionHub from '../components/Common/ActionHub'
import Footer from '../components/Layout/Footer'

function IndexPage() {
  return (
    <>
   <NavBar/>
    <HomePage/>
    <ActionHub/>
    {/* <ClientsSection/> */}

    <Footer/>
    </>
  )
}

export default IndexPage