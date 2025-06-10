import React from 'react';

interface PageHeaderProps {
  title: string;
  pathName: string;
  pathLink: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, pathName, pathLink }) => {
  const bgImageUrl = 'https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/bg.jpg';

  return (
    <div
      className="container-fluid relative mb-5 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
      <div className="relative z-10 flex min-h-[400px] flex-col items-center justify-center pt-0 pt-5 lg:pt-12">
        <h1 className="mb-3 mt-0 text-center text-4xl font-extrabold uppercase text-white lg:mt-5 lg:text-6xl">
          {title}
        </h1>
        <div className="mb-5 flex items-center justify-center text-white lg:mb-12">
          <p className="text-white mr-2">
            Home /
          </p>
          <p className="m-0">
            <a className="text-white hover:text-gray-300" href={pathLink}>
              {pathName}
            </a>
          </p>
        </div>
      </div>
      {/* Bottom Overlay */}
      <div className="overlay-bottom relative">
        <img
          src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/overlay-bottom.png"
          alt="overlay bottom"
          className="absolute bottom-[-1px] left-0 w-full h-[15px] z-10"
        />
      </div>
    </div>
  );
};

export default PageHeader;
