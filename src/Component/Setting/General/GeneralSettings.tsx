import {Package} from "lucide-react";
import StoreInformation from "./StoreInformation";
import StorePreferences from "./StorePreferences";
import ProfileInformation from "./Profilenformation";
import { useGetProfileQuery } from "../../../api/adminAuthApi"




export default function GeneralSettings() {

const { data, isLoading,isError } = useGetProfileQuery();
 const user = data?.data;


  console.log("data",data)

  if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={28} className="text-purple-600" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium">Loading Dashboard...</p>
                    <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    if (isError)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">📡</div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        No Internet Connection
                    </h2>

                    <p className="text-slate-500 mb-6">
                        Please check your network and try again.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );

  return (
    <div className="space-y-6">
      <ProfileInformation user={user}/>
      <StoreInformation user={user} />
      <StorePreferences user={user} />
    </div>
  );
}