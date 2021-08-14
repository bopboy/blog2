import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import PostHeadInfo, { PostHeadInfoProps } from "./postheadinfo"
import Img, { FluidObject } from 'gatsby-image'

type GatsbyImageProps = {
    fluid: FluidObject
    alt: string
    className?: string
}

export interface PostHeadProps extends PostHeadInfoProps {
    thumbnail: FluidObject
}

const PostHeadWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 400px;

    @media (max-width:768px) {
        height: 300px;
    }
`

const BackgroundImage = styled((props: GatsbyImageProps) => (
    <Img {...props} style={{ position: 'absolute' }} />
))`
    z-index:-1;
    width: 100%;
    height: 400px;
    object-fit: cover;
    filter:brightness(0.25);

    @media (max-width:768px) {
        height: 300px;
    }
`

const PostHead: FunctionComponent<PostHeadProps> = function ({
    title, date, categories, thumbnail
}) {
    return (
        <PostHeadWrapper>
            <BackgroundImage fluid={thumbnail} alt="thumbnail"></BackgroundImage>
            <PostHeadInfo title={title} date={date} categories={categories} />
        </PostHeadWrapper>
    )
}

export default PostHead