import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import GlobalStyle from "components/common/globalstyle"

const NotFoundPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const NotFoundText = styled.div`
    font-size: 150px;
    font-weight: 800;

    @media(max-width:768px) {
        font-size: 100px;
    }
`

const NotFoundDescription = styled.div`
    font-size:25px;
    text-align: center;
    line-height: 1.3;

    @media(max-width:768px) {
        font-size: 20px;
    }
`

const GotoMainButton = styled(Link)`
    margin-top:30px;
    font-size:20px;
    text-decoration: underline;

    &:hover {
        text-decoration: underline;
    }
`

const NotFoundPage: FunctionComponent = function () {
    return (
        <NotFoundPageWrapper>
            <GlobalStyle />
            <NotFoundText>404</NotFoundText>
            <NotFoundDescription>
                찾는 페이지는 없어요. 다른 콘텐츠를 찾아요
            </NotFoundDescription>
            <GotoMainButton to="/">메인으로 돌아가기</GotoMainButton>
        </NotFoundPageWrapper>
    )
}

export default NotFoundPage