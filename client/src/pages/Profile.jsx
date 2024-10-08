import {
    PropertyCardList,
    LoadingSkelton,
    EditProfileModal,
    LogoutAlertModal,
    UpdatePasswordModal,
    ErrorComponent
} from "../components";
import useGlobalStateStore from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { fetchUserListings } from "../utils/api/userApi";
import { Link } from "react-router-dom";

const Profile = () => {

    const user = useGlobalStateStore((state) => state.user)

    const { data: userListings, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ["userListings", user._id],
        queryFn: fetchUserListings
    })

    return (
        <section className="mt-12 md:mt-20">
            <div className="container py-12 min-h-[80vh]">
                <div className="w-full">
                    <div className="w-full">
                        <div className="flex flex-col items-center gap-8 pb-12 border-b">
                            <div className="flex flex-col items-center gap-6">
                                <img className="inline-block size-20 sm:size-28 rounded-full border object-cover border-gray-500" src={user.profileImage} alt={user.username} />

                                <div className="text-center">
                                    <h4 className="font-medium text-3xl">{user.username}</h4>
                                    <h6 className="mt-3">{user.email}</h6>
                                </div>

                            </div>

                            <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-8">
                                <EditProfileModal />
                                <UpdatePasswordModal />
                                <LogoutAlertModal />
                            </div>
                        </div>

                        <div className="flex max-xl:flex-col-reverse gap-4 xl:gap-16">
                            <div className="w-full py-12">
                                <h3 className="font-medium">My Listings</h3>

                                {isLoading && (
                                    <div className="py-5">
                                        <LoadingSkelton count={8} />
                                    </div>
                                )}

                                {isError && <ErrorComponent retryFn={refetch} />}

                                {isSuccess && userListings.length > 0 ? (
                                    <PropertyCardList listings={userListings} />
                                ) : (
                                    <div className="w-full h-[40vh] flex flex-col gap-4 items-center justify-center">
                                        <h4 className="text-center">No listings found</h4>
                                        <Link to="/listing/new" className="btn-primary">Add Listings</Link>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile