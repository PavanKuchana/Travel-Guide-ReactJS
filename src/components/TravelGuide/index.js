import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPackageItem from '../TravelPackageItem'
import {
  BgContainer,
  MainHeading,
  TravelGuideList,
  LoaderContainer,
} from './styledComponents'

class TravelGuide extends Component {
  state = {
    isLoading: false,
    travelPackageList: [],
  }

  componentDidMount() {
    this.getTravelPackages()
  }

  getTravelPackages = async () => {
    this.setState({isLoading: true})
    const apiUrlPackages = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrlPackages, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        travelPackageList: updatedData,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderTravelPackages = () => {
    const {travelPackageList} = this.state
    return (
      <TravelGuideList>
        {travelPackageList.map(each => (
          <TravelPackageItem key={each.id} TravelPackageItemDetails={each} />
        ))}
      </TravelGuideList>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <BgContainer>
        <MainHeading>Travel Guide</MainHeading>
        {isLoading ? this.renderLoader() : this.renderTravelPackages()}
      </BgContainer>
    )
  }
}

export default TravelGuide
