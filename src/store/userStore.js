// store/userStore.js
import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  DashboardData: [],
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("http://10.10.13.36/dashboard/admin/dashboard/");
      set({ DashboardData: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },


  refetchDashboardData: () => {
    useUserStore.getState().fetchDashboardData();
  },
}));

export default useUserStore;
