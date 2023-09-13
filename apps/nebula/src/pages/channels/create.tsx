import { EnterAnimation } from "@nebula/ui/animate/enter";
import { Page } from "@nebula/ui/components";
import { CreateChannelStepsDispatcher } from "@nebula/ui/features/channels/components";
import { ChannelsNav } from "@nebula/ui/features/channels/navs";
import { useChannelStore } from "@nebula/ui/features/channels/store/createStore";

export default function CreateChannelPage() {
  const { step } = useChannelStore();

  return (
    <Page
      navigation={<ChannelsNav isActionEnabled={false} />}
      isDataSettingsEnabled={false}
    >
      <div className="max-w-202 px-8 py-12">
        <div className="flex flex-col gap-8">
          <h1 className="text-title-medium font-title-medium text-white">
            Create a channel
          </h1>
          <EnterAnimation key={step}>
            <CreateChannelStepsDispatcher />
          </EnterAnimation>
        </div>
      </div>
    </Page>
  );
}
