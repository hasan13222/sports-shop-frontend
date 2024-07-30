import  { useEffect, useState } from 'react';
import { Carousel } from 'antd';

// const contentStyle: React.CSSProperties = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

const Slider = () => {
    type TSliderItems = {
        image?: string;
    }
    const [sliderItems, setSliderItems] = useState<TSliderItems[]>([]);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    fetch('/json/slider.json')
    .then(res => res.json())
    .then(data => setSliderItems(data))
  }, [])
  return (
    <Carousel autoplay autoplaySpeed={5000} afterChange={onChange}>
        {sliderItems?.map(item => (
            <div className='w-full max-h-[500px] overflow-hidden'>
                <img className='w-full h-full object-cover' src={`/sliderImgs/${item?.image}`} alt="slider thumbnail" />
            </div>
        ))}
      
    </Carousel>
  );
};

export default Slider;