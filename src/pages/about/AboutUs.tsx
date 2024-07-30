const AboutUs = () => {
  return (
    <>
      <div className="about_us container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-2 text-center">About Us</h2>
        <div className="teams">
          <h3 className="text-xl font-semibold my-5">Our Team</h3>
          <div className="members grid grid-cols-4 gap-9">
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/oph.png"
                alt="team member"
              />
              <p>Operation Head</p>
            </div>
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/so1.png"
                alt="team member"
              />
              <p>Sales Officer</p>
            </div>
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/so2.png"
                alt="team member"
              />
              <p>Sales Officer</p>
            </div>
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/so3.png"
                alt="team member"
              />
              <p>Sales Officer</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 items-center about_us">
          <div className="texts">
            <h3 className="text-xl font-semibold mt-2">Our Shop</h3>
            <p>
              Welcome to Sports Heights, your one-stop destination for all
              things sporting goods! Founded in 2005, we are a passionate team
              of athletes, outdoor enthusiasts, and sports fans dedicated to
              bringing you the best in high-quality sports equipment and
              apparel.
            </p>
            <h3 className="text-xl font-semibold mt-2">Our Mission</h3>
            <p>
              At Sports Heights, our mission is to inspire and equip athletes of
              all levels to achieve their personal best. We believe that sports
              and outdoor activities are essential for a healthy and balanced
              lifestyle, and we are committed to providing the tools and gear
              necessary to support your journey.
            </p>
          </div>
          <div className="group_img p-8">
            <img
              className="h-[300px] object-contain"
              src="/sliderImgs/slider1.jpg"
              alt="about us"
            />
          </div>
        </div>
        <div className="about_btm">
          <h3 className="text-xl font-semibold mt-2">Our Products</h3>
          <p>
            We offer a wide range of products catering to various sports and
            activities, including: Team Sports: Soccer, Basketball, Baseball,
            and more Outdoor Adventures: Camping, Hiking, Fishing, and Climbing
            Fitness: Workout Gear, Apparel, and Accessories Water Sports:
            Swimming, Surfing, and Kayaking Winter Sports: Skiing, Snowboarding,
            and Ice Skating Each product is carefully selected for its quality,
            durability, and performance, ensuring that you have the best
            experience possible.
          </p>

          <h3 className="text-xl font-semibold mt-2">Our Promise</h3>
          <p>
            We strive to provide exceptional customer service and support.
            Whether you're a seasoned pro or just starting out, our
            knowledgeable staff is here to help you find the right gear for your
            needs.
          </p>
          <h3 className="text-xl font-semibold mt-2">Our Vision</h3>
          <p>
            We believe in building long-lasting relationships with our customers
            based on trust and satisfaction. Community Involvement: At Sports
            Heights, we believe in giving back to the community. We proudly
            support local sports teams, events, and initiatives that promote
            active and healthy lifestyles. We also collaborate with various
            organizations to make sports accessible to everyone. Why Choose Us?
            Extensive selection of top brands and products Competitive prices
            and special offers Fast and reliable shipping Easy returns and
            exchanges Expert advice and personalized service Thank you for
            choosing Sports Heights. We are excited to be a part of your
            sporting journey and look forward to helping you reach new heights!
          </p>
          <h3 className="text-xl font-semibold mt-2">Our Store Location</h3>
          <p>15/2C, Heritage Home, East London, England</p>
          <h3 className="text-xl font-semibold mt-2">Our Contact Info</h3>
          <p>
            demo@mail.com
            <br />
            019524855455
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
