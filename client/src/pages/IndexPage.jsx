import NavBar from '../components/Layout/NavBar'
import HomePage from './HomePage'
import ClientsSection from './PartnersSection'

import ActionHub from '../components/Common/ActionHub'

function IndexPage() {
  return (
    <>
   <NavBar/>
    <HomePage/>
    <ActionHub/>
    <ClientsSection/>
    </>
  )
}

export default IndexPage