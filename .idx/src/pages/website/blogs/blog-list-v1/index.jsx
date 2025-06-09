import Blog from "@/components/blog/blog-list-v1/Blog";
import BlogSidebar from "@/components/blog/sidebar";
import Footer from "@/components/common/default-footer";
import Header from "@/components/common/Header";
import MetaData from "@/components/common/MetaData";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/blog/Pagination";

const metaInformation = {
  title: "Blog List v1  || Flapabay- Apartment Rental, Experiences and More!",
};

const BlogV1 = () => {
  return (
    <div className="bgc-f7">
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Start */}
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Blog</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Blog</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Start */}

      {/* Blog Section Area */}
      <section className="pt-0 our-blog">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-8">
              <Blog />
              <div className="row">
                <div className="text-center mbp_pagination">
                  <Pagination />
                  <p className="text-center mt10 pagination_page_count">
                    1 – 20 of 300+ property available
                  </p>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}

            <div className="col-lg-4">
              <BlogSidebar />
            </div>
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
  );
};

export default BlogV1;
