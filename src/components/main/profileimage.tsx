import React, { FunctionComponent } from "react"
import styled from '@emotion/styled'
import Img, { FluidObject } from "gatsby-image"

const ProfileImageWrapper = styled(Img)`
    width:120px;
    height: 120px;
    margin-bottom: 30px;
    border-radius: 50%;

    @media (max-width:768px) {
        width:80px;
        height: 80px;
    }
`
export interface ProfileImageProps {
    profileImage: FluidObject
}
const ProfileImage: FunctionComponent<ProfileImageProps> = function ({ profileImage }) {
    return <ProfileImageWrapper fluid={profileImage} alt="프로필 이미지" />
}

export default ProfileImage