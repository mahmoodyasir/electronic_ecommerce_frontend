import { ReactNode } from "react";
import StickyImage from "./StickyImage";
import OverlayCopy from "./OverlayCopy";


const IMG_PADDING = 12;

const TextParallaxContent = ({
    imgUrl,
    subheading,
    heading,
    children,
  }: {
    imgUrl: string;
    subheading: string | ReactNode;
    heading: string | ReactNode;
    children: ReactNode;
  }) => {
    return (
      <div
        style={{
          paddingLeft: IMG_PADDING,
          paddingRight: IMG_PADDING,
        }}
      >
        <div className="relative">
          <StickyImage imgUrl={imgUrl} />
          <OverlayCopy heading={heading} subheading={subheading} />
        </div>
        {children}
      </div>
    );
  };

export default TextParallaxContent
