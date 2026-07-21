


// import { LogIn } from "lucide-react";
// import { Link } from "react-router-dom";
// export default function Header() {
//     return (
//         <header className="bg-[#0066e5] text-white h-20 flex items-center justify-between px-10 shadow">
//             <div className="flex items-center gap-4">
//                 <div className="h-12 w-12 rounded-lg bg-yellow-400 flex items-center justify-center text-2xl font-bold text-[#0066e5]">
//                     F
//                 </div>

//                 <div>
//                     <h1 className="text-2xl font-bold leading-5">
//                         Faykaa Seller Hub
//                     </h1>

//                     <p className="text-sm text-blue-100">
//                         Sell across India
//                     </p>
//                 </div>
//             </div>

//             <button className="flex items-center gap-2 text-sm hover:underline">
//                 Already a seller?
            
//                 <Link to="/SellerRegister" >
//                                 <span className="font-semibold"> Login  </span>         
//                                      </Link>
//                 <LogIn size={18} />
//             </button>
//         </header>
//     );
// }





import { LogIn,  } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderImproved() {
    return (
        <header className="bg-gradient-to-r from-[#0066e5] via-[#0052cc] to-[#0052cc] text-white shadow-lg border-b border-blue-600/30">
            <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
                
                {/* Logo & Branding */}
                <Link to="/" className="flex items-center gap-4 group hover:opacity-90 transition-opacity duration-200">
                    {/* Logo Circle */}
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-2xl font-bold text-[#0066e5] shadow-md group-hover:shadow-lg transition-shadow duration-200">
                        F
                    </div>

                    {/* Brand Text */}
                    <div className="flex flex-col gap-0">
                        <h1 className="text-xl font-bold leading-tight tracking-tight">
                            Faykaa Seller Hub
                        </h1>
                        <p className="text-xs text-blue-100 font-medium uppercase tracking-wider">
                            Sell Across India
                        </p>
                    </div>
                </Link>

                {/* Right Section - Login/Auth */}
                <Link to="/login">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-lg group">
                        <span>Already a seller?</span>
                        <LogIn size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </button>
                </Link>
            </div>
        </header>
    );
}