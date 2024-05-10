import styled from '@emotion/styled';
import Flicking, { Plugin } from '@egjs/react-flicking';

import { ImageInfo } from '@/types/history';

interface ImageCarouselProps {
  images: ImageInfo[];
  pluginOptions: Plugin[];
}

const StyledFlicking = styled(Flicking)`
  overflow-x: hidden;
  .flicking-viewport {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    align-items: center;
  }
  .flicking-camera {
    display: flex;
  }
`;

const FlickingPanel = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 20rem;
  height: 14rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
`;

const PanelImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 1rem;
`;

const Caption = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
`;

const ImageCarousel = ({ images, pluginOptions }: ImageCarouselProps) => {
  return (
    <StyledFlicking circular plugins={pluginOptions}>
      {images.map((img) => (
        <FlickingPanel key={img.imageUrl}>
          <PanelImage src={img.imageUrl} alt={img.caption} />
          <Caption>{img.caption}</Caption>
        </FlickingPanel>
      ))}
    </StyledFlicking>
  );
};
export default ImageCarousel;
