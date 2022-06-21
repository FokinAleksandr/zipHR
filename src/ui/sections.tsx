import styled from '@emotion/native';

export const SectionsWrapper = styled.View`
  background-color: rgb(236, 238, 244);
  padding-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  padding: 12px;
`;

export const Sections = styled.ScrollView`
  padding: 0 12px;
`;

export const Section = styled.Pressable<{ isSelected?: boolean }>`
  border-width: 1px;
  border-color: ${props => (props.isSelected ? 'blue' : 'black')};
  border-radius: 6px;
  height: 30px;
  width: 120px;
  margin: 0 16px 12px 0;
  justify-content: center;
  align-items: center;
`;

export const SectionText = styled.Text<{ isSelected?: boolean }>`
  color: ${props => (props.isSelected ? 'blue' : 'black')};
  text-transform: capitalize;
`;
