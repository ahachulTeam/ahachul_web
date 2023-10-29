import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import { DEFAULT_SEO_CONFIG } from '@/constants'
import { SEO } from '@/libs'
import { SEOProps } from '@/libs/SEO'

interface PageTemplateProps {
  isPrivatePage?: boolean
  metaData?: Partial<SEOProps>
}

const PageTemplate = ({ isPrivatePage = false, metaData, children }: PropsWithChildren<PageTemplateProps>) => {
  return (
    <React.Fragment>
      {!isPrivatePage && <SEO {...(metaData ? metaData : DEFAULT_SEO_CONFIG)} />}
      {children}
    </React.Fragment>
  )
}

PageTemplate.ContentsSection = function ContentsSection({ children }: PropsWithChildren<PageTemplateProps>) {
  return <ContentsSectionStyled>{children}</ContentsSectionStyled>
}

PageTemplate.ModalOrFloatingContents = function ModalOrFloatingContents({
  children,
}: PropsWithChildren<PageTemplateProps>) {
  return <ModalOrFloatingContentsStyled>{children}</ModalOrFloatingContentsStyled>
}

const ContentsSectionStyled = styled.section`
  position: relative;
  width: 100%;
`

const ModalOrFloatingContentsStyled = styled.div`
  position: relative;
  width: 100%;
`

export default PageTemplate
