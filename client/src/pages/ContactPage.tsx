import React from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { assets } from "@/assets";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn để bạn tìm được chiếc
            laptop phù hợp nhất
          </p>
        </div>

        <div className="">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-6">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-12">
                <a
                  href="tel:0777770941"
                  className="bg-green-100 h-[200px] lg:w-[300px] w-full flex flex-col justify-center items-center gap-6 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition"
                >
                  <div className="p-3 rounded-lg">
                    <Phone className="size-12 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Điện thoại</h3>
                    <p className="text-gray-600">0777 770 941</p>
                  </div>
                </a>

                <a
                  href="https://zalo.me/0777770941"
                  target="_blank"
                  className="bg-blue-100 h-[200px] lg:w-[300px] w-full flex flex-col justify-center items-center gap-6 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition"
                >
                  <div className="p-3 rounded-lg">
                    <img src={assets.zalo} alt="zalo" className="size-12" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Zalo</h3>
                    <p className="text-gray-600">0777 770 941</p>
                  </div>
                </a>

                <a
                  href="mailto:levanbinhphuong@gmail.com"
                  className="bg-purple-100 h-[200px] lg:w-[300px] w-full flex flex-col justify-center items-center gap-6 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition"
                >
                  <div className="p-3 rounded-lg">
                    <Mail className="size-12 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">levanbinhphuong@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Services */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-4 text-2xl">
                Dịch vụ nhanh:
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 text-lg">Tư vấn miễn phí</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 text-lg">
                    Giao hàng tận nơi
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 text-lg">
                    Bảo hành tại cửa hàng
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-lg text-gray-700">Hỗ trợ kỹ thuật</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-16">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center justify-between  mb-6">
              <p className="font-bold text-gray-900">Vị trí cửa hàng:</p>
              <a target='_blank' href='https://www.google.com/maps/place/9+%C4%90.+Tr%E1%BB%8Bnh+V%C4%83n+C%E1%BA%A5n,+Ph%C6%B0%E1%BB%9Dng+C%E1%BA%A7u+%C3%94ng+L%C3%A3nh,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7672723,106.6917507,1068m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31752f158158cfe7:0x90088e2d4ce47b7b!8m2!3d10.7672671!4d106.6966216!16s%2Fg%2F11j8h00_l0?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D' className='text-lg font-bold text-gray-900 hover:text-blue-600'>9 Đ. Trịnh Văn Cấn, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Việt Nam</a>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4649.390599175701!2d106.69175068399174!3d10.767272331999637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f158158cfe7%3A0x90088e2d4ce47b7b!2zOSDEkC4gVHLhu4tuaCBWxINuIEPhuqVuLCBQaMaw4budbmcgQ-G6p3Ugw5RuZyBMw6NuaCwgUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1753770624521!5m2!1svi!2s" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='size-full'></iframe>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactPage;
