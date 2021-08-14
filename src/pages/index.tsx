import React, { FunctionComponent, useMemo } from 'react';
import Template from 'components/common/template';
import Introduction from 'components/main/introduction';
import CategoryList, { CategoryListProps } from 'components/main/categorylist';
import PostList, { PostType } from 'components/main/postlist';
import { ProfileImageProps } from 'components/main/profileimage';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string'

interface IndexPageProps {
    location: { search: string }
    data: {
        site: {
            siteMetadata: {
                title: string
                description: string
                siteUrl: string
            }
        }
        allMarkdownRemark: {
            edges: PostType[]
        }
        file: {
            publicURL: string
            childImageSharp: {
                fluid: ProfileImageProps['profileImage']
            }
        }
    }
}
const IndexPage: FunctionComponent<IndexPageProps> = function ({
    location: { search },
    data: {
        site: { siteMetadata: { title, description, siteUrl } },
        allMarkdownRemark: { edges },
        file: {
            publicURL,
            childImageSharp: { fluid } }
    },
}) {
    const parsed: ParsedQuery<string> = queryString.parse(search)
    const selectedCategory: string = typeof parsed.category !== 'string' || !parsed.category ? 'All' : parsed.category
    const categoryList = useMemo(() => (edges.reduce((
        list: CategoryListProps['categoryList'],
        { node: { frontmatter: { categories } } }: PostType
    ) => {
        categories.forEach(c => {
            if (list[c] === undefined) list[c] = 1
            else list[c]++
        })
        list['All']++
        return list
    }, { All: 0 })), [])
    return (
        <Template title={title} description={description} url={siteUrl} image={publicURL}>
            <Introduction profileImage={fluid} />
            <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
            <PostList selectedCategory={selectedCategory} posts={edges} />
        </Template>
    );
};

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
        siteMetadata {
            title
            description
            siteUrl
        }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
              slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                fluid(
                  maxWidth: 768
                  maxHeight: 200
                  fit: INSIDE
                  quality: 100
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`