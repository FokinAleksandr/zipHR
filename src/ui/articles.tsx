import styled from '@emotion/native';

export const ArticleImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 8px;
`;

export const Articles = styled.ScrollView`
  padding: 12px;
  background-color: rgb(138, 206, 224);
`;

export const Article = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

export const ArticleTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const PublishedByText = styled.Text`
  flex-shrink: 1;
  flex-wrap: wrap;
  margin: 8px 0 4px;
`;
