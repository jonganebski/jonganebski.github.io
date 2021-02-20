import { graphql, PageProps } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { GalleryItem } from "../components/gallery-item"
import { Layout } from "../components/layout"
import { IGalleryMarkdownsQuery } from "../dtos/gallery.dto"
import { styled } from "../styles/themes"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { Helmet } from "react-helmet"

export const GALLERY_MARKDOWNS = graphql`
  query GalleryMarkdowns {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "gallery" } } }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            coverUrl
          }
          html
        }
      }
    }
  }
`

const Main = styled.main`
  position: relative;
  max-width: 1200px;
  width: 100%;
`

const Slider = styled.ul`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`

const ExploreBtnCore = styled.div`
  position: absolute;
  width: 3rem;
  height: 50%;
  font-size: 2rem;
  top: 50%;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${({ theme }) => theme.textColor.linkHover};
    }
  }
  display: none;
  @media only screen and (min-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const ExploreLeft = styled(ExploreBtnCore)`
  left: 0;
  transform: translateY(-50%);
`
const ExploreRight = styled(ExploreBtnCore)`
  right: 0;
  transform: translateY(-50%);
`

const Navigator = styled.nav`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 2px;
`

const DotContainer = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

interface IDotProps {
  isLocation: boolean
}

const Dot = styled.span<IDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${({ isLocation, theme }) =>
    isLocation ? theme.textColor.linkHover : theme.textColor.shade};
`

const GalleryPage: React.FC<PageProps<IGalleryMarkdownsQuery>> = ({ data }) => {
  const sliderRef = useRef<HTMLUListElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.querySelectorAll("p").forEach(p => {
        p.onclick = e => e.stopPropagation()
      })
    }
  }, [sliderRef.current])

  const isNotFirstPhoto = 0 < currentIndex

  const isNotLastPhoto = currentIndex < data.allMarkdownRemark.edges.length - 1

  const scrollTo = (targetIndex: number) => {
    if (sliderRef.current) {
      if (isNotFirstPhoto || isNotLastPhoto) {
        sliderRef.current.scroll({
          behavior: "smooth",
          left: sliderRef.current.clientWidth * targetIndex,
        })
      }
    }
  }

  const onScroll = () => {
    if (sliderRef.current) {
      const index = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth
      )
      setCurrentIndex(index)
    }
  }

  return (
    <Layout>
      <Helmet title="Gallery | JonGanebski" />
      <Main>
        <Slider ref={sliderRef} onScroll={onScroll}>
          {data.allMarkdownRemark.edges.map(edge => {
            return <GalleryItem node={edge.node} key={edge.node.id} />
          })}
          {isNotFirstPhoto && (
            <ExploreLeft onClick={() => scrollTo(currentIndex - 1)}>
              <MdKeyboardArrowLeft />
            </ExploreLeft>
          )}
          {isNotLastPhoto && (
            <ExploreRight onClick={() => scrollTo(currentIndex + 1)}>
              <MdKeyboardArrowRight />
            </ExploreRight>
          )}
        </Slider>
        <Navigator role="list">
          {data.allMarkdownRemark.edges.map((edge, index) => {
            return (
              <DotContainer onClick={() => scrollTo(index)} key={edge.node.id}>
                <Dot isLocation={index === currentIndex} />
              </DotContainer>
            )
          })}
        </Navigator>
      </Main>
    </Layout>
  )
}

export default GalleryPage
