import styled from 'styled-components'

import loader from '@/shared/assets/loader.gif'

const Container = styled.div`
  height: 44px;
  background-image: url(${loader});
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: auto 24px;
  margin: 6px auto;
  display: inline-block;
  width: 100%;
}
`
export const Loader = () => {
    return <Container />
}
