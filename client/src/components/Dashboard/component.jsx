import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Guage from '../Guage'

const DashboardWrapper = styled.div`
  margin: 2.5rem;
  padding: 1.25rem;
  background-color: rgb(240, 240, 240);
  border-radius: 6px;
`

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.loadURLCount()
    this.props.loadClickCount()
  }

  render() {
    const { clicks, urls } = this.props

    return (
      <DashboardWrapper>
        <h3 className="m-0">Dashboard</h3>
        <div className="w-100 d-flex justify-content-center">
          <Guage label="URLs" count={urls} />
          <Guage label="Total Clicks" count={clicks} />
        </div>
      </DashboardWrapper>
    )
  }
}

export default Dashboard
