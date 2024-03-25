import { NewChannel } from "@solstice/cosmos/tables/channels";
import { create } from "zustand";

export enum CreateChannelsSteps {
  NAME,
  TRACKING_TYPE,
  PARAMETERS,
  REVIEW,
  CREATED,
}

export interface ChannelStore {
  step: CreateChannelsSteps;
  setStep: (step: CreateChannelsSteps) => void;
  channel: NewChannel | Partial<NewChannel> | undefined;
  setChannel: (channel: Partial<NewChannel>) => void;
  resetChannel: () => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  step: CreateChannelsSteps.NAME,
  setStep: (step: CreateChannelsSteps) => set(() => ({ step })),
  channel: undefined,
  setChannel: (newChannel: Partial<NewChannel>) => {
    set((state) => ({
      ...state,
      channel: { ...state.channel, ...newChannel },
    }));
  },
  resetChannel: () =>
    set(() => ({
      step: CreateChannelsSteps.NAME,
      channel: undefined,
    })),
}));

export const useSafeChannel = () => {
  const { channel } = useChannelStore();

  if (!channel) {
    throw new Error("The channel is undefined");
  }

  return {
    channel,
  };
};
