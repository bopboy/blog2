import React, { FunctionComponent } from "react"
import styled from '@emotion/styled'
import PostItem from "./postitem"
import { FluidObject } from 'gatsby-image'
import useInfiniteScroll, { useInfiniteScrollType } from "hooks/useInfiniteScroll"

// const POST_ITEM_DATA = {
//     title: '포스트 아이템 타이틀',
//     date: '2021-08-13',
//     categories: ['Web', 'Frontend', 'Testing'],
//     summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste perferendis sapiente, accusantium enim eligendi sunt rem quo ea inventore corrupti tempore cumque error fugit fuga beatae similique dolor suscipit!',
//     thumbnail: 'https://ji5485.github.io/static/e4f34c558ae8e8235ff53b0311085796/4d854/javascript-core-concept-summary-function-1.webp',
//     link: 'https://www.google.co.kr'
// }

export type PostType = {
    node: {
        id: string;
        fields: {
            slug: string
        }
        frontmatter: {
            title: string;
            summary: string;
            date: string;
            categories: string[];
            thumbnail: {
                childImageSharp: {
                    fluid: FluidObject
                }
            };
        };
    };
};
interface PostListProps {
    selectedCategory: string
    posts: PostType[]
}
const PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 768px;
    margin:0 auto;
    padding:50px 0 100px;

    @media (max-width:768px) {
        grid-template-columns:  1fr;
        width:100%;
        padding:50px 20px;
    }
`

const PostList: FunctionComponent<PostListProps> = function ({ selectedCategory, posts }) {
    const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(selectedCategory, posts)
    return (
        <PostListWrapper ref={containerRef}>
            {postList.map(
                ({
                    node: { id, fields: { slug }, frontmatter }
                }: PostType) => (
                    <PostItem
                        {...frontmatter}
                        link={slug}
                        key={id}
                    />
                ),
            )}
        </PostListWrapper>
    );
};

// const PostList: FunctionComponent<PostListProps> = function ({ selectedCategory, posts }) {
//     const postListData = useMemo(() => posts.filter(({ node: { frontmatter: { categories } } }: PostType) => selectedCategory !== 'All' ? categories.includes(selectedCategory) : true), [selectedCategory])
//     return (
//         <PostListWrapper>
//             {postListData.map(
//                 ({
//                     node: { id, frontmatter }
//                 }: PostType) => (
//                     <PostItem
//                         {...frontmatter}
//                         link="https://www.google.co.kr"
//                         key={id}
//                     />
//                 ),
//             )}
//         </PostListWrapper>
//     );
// };
export default PostList

