import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  ButtonSecondary,
  HorizontalDivider,
  TextInputGroup,
} from "@nebula/ui/components";
import {
  LoadingLayout,
  OnboardingLayout,
  OnboardingSplitLayout,
} from "@nebula/ui/layouts";
import { ONBOARDING_PATHNAMES } from "@nebula/constants";
import { useQuerySafely } from "@nebula/hooks";
import { AddChannelForm, addChannelFormSchema } from "@nebula/schemas";
import { api } from "@nebula/utils/api";

type InMemoryChannel = AddChannelForm;

enum ChannelsSteps {
  EDUCATE,
  CREATE_CHANNELS,
  REVIEW_CHANNELS,
}

interface DefaultChannel {
  name: string;
  description: string;
}

const defaultInMemoryChannels: DefaultChannel[] = [
  {
    name: "Organic search",
    description:
      "When a visitor comes to your website from a search engine (ie. Google, Bings...).",
  },
  {
    name: "Referral",
    description:
      "When a visitor comes to your website from another website (ie. indirect seller).",
  },
  {
    name: "Direct traffic",
    description:
      "When a visitor comes to your website directly (by typing your URL in the search bar).",
  },
];

export default function OnboardingChannel() {
  const { isLoading } = api.user.getMe.useQuery();

  const [currentStep, setCurrentStep] = useState<ChannelsSteps>(
    ChannelsSteps.EDUCATE,
  );

  if (isLoading) return <LoadingLayout />;

  if (currentStep === ChannelsSteps.EDUCATE) {
    return <EducateChannels setCurrentStep={setCurrentStep} />;
  }

  if (currentStep === ChannelsSteps.CREATE_CHANNELS) {
    return <AddChannels setCurrentStep={setCurrentStep} />;
  }
}

function EducateChannels({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<ChannelsSteps>>;
}) {
  return (
    <OnboardingLayout
      title={<>Channels</>}
      subtitle={<>Identification accuracy</>}
      description={
        <div className="flex flex-col gap-2">
          <p>
            Attribution is often unreliable because traditional software exclude
            channels such as podcasts, events, words-of-mouth, social... They're
            difficult to track and to identify. But they account for a
            significant part of your revenue.
          </p>
          <p>
            The way people are buying online today is changing. We're not only
            buying from ads, we're buying from podcasts, social, events,
            words-of-mouth... Nobody wakes up one day, goes into a search bar
            and type your website URL: they heard about you somewhere before.
            And one of our objective, is to help you know from where.
          </p>
          <p>
            Often, the software will assign 'Direct traffic' instead of these.
            Why? Because it's easier to do so. In Solstice, whenever a journey
            has a 'Direct traffic' touch (specially as the first touch) we will
            help you identify the real channel behind it via hybrid attribution.
            Don't worry for now, just keep in mind that it will occur in the
            future, and we'll be here for that.
          </p>
        </div>
      }
    >
      <div className="flex justify-end">
        <Button
          onClick={() => setCurrentStep(ChannelsSteps.CREATE_CHANNELS)}
          type="button"
          label={<>Create your own channels</>}
        />
      </div>
    </OnboardingLayout>
  );
}

function AddChannels({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<ChannelsSteps>>;
}) {
  const { data: user } = useQuerySafely.useMe();

  const [inMemoryChannels, setInMemoryChannels] = useState<AddChannelForm[]>(
    [],
  );

  const { push } = useRouter();

  const { mutateAsync, isLoading } = api.user.addChannels.useMutation({
    onSuccess: () => push({ pathname: ONBOARDING_PATHNAMES.FINISH }),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddChannelForm>({
    resolver: zodResolver(addChannelFormSchema),
  });

  const utmSource = watch("utmSource");

  const onSubmit = (formData: AddChannelForm) => {
    setInMemoryChannels([...inMemoryChannels, formData]);
    reset();
  };

  const handleCreateInMemoryChannels = async () => {
    await mutateAsync(inMemoryChannels);
  };

  const hasChannelsToCreate = inMemoryChannels.length;

  return (
    <OnboardingSplitLayout
      title={<>Channels</>}
      firstSubtitle={<>Add a channel</>}
      secondSubtitle={<>Your channels</>}
      firstDescription={
        <div className="flex flex-col gap-2">
          <span>
            Channels are mostly tracked with utm: paid traffic, email, content
            syndication, virtual events, podcasts, offline conversions...
          </span>
          <span>
            For this, you need to specify the
            <pre className="suisse-mono inline">
              <code className="px-1 text-xs text-content-strong">
                {"utm_source"}
              </code>
            </pre>
            of your channel. Any visitor coming from this source will be mapped
            the channel.
          </span>
        </div>
      }
      firstChild={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full gap-4"
        >
          <div className="flex flex-col gap-1">
            <TextInputGroup
              register={register}
              error={errors.name}
              name="name"
              label="Name"
            />
            <span className="label-mini-regular text-content-moderate">
              The name as it will appear in Solstice (ie. LinkedIn Ads)
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <TextInputGroup
              register={register}
              error={errors.utmSource}
              name="utmSource"
              label="UTM source"
            />
            <span className="flex flex-col gap-1 label-mini-regular text-content-moderate">
              <span>
                https://{user.companyWebsiteHostname}?utm_source=
                <span className="text-content-strong">{utmSource}</span>
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <TextInputGroup
              register={register}
              error={errors.category}
              name="category"
              label="Category"
            />
            <span className="label-mini-regular text-content-moderate">
              The category of the channel (ie. Paid, Organic, Social...)
            </span>
          </div>
          <div>
            <div className="flex gap-2 h-full items-end justify-end pt-2">
              <Button type="submit" label={<span>Add your channel</span>} />
            </div>
          </div>
        </form>
      }
      secondChild={
        <>
          <HorizontalDivider />
          <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto">
            {inMemoryChannels
              .sort((cA, cB) => cA.category.localeCompare(cB.category))
              .map((channel) => (
                <InMemoryChannel
                  key={channel.name}
                  channel={channel}
                  companyWebsiteHostname={user.companyWebsiteHostname as string}
                  handleDeleteChannel={(channel) => {
                    setInMemoryChannels(
                      inMemoryChannels.filter((c) => c.name !== channel.name),
                    );
                  }}
                />
              ))}
            {defaultInMemoryChannels?.map((channel) => (
              <ChannelDefaultCard key={channel.name} channel={channel} />
            ))}
          </div>
          <div className="flex items-end justify-end">
            {hasChannelsToCreate ? (
              <ButtonSecondary
                onClick={handleCreateInMemoryChannels}
                label={<>Continue</>}
              />
            ) : null}
          </div>
        </>
      }
    />
  );
}

function InMemoryChannel({
  channel,
  companyWebsiteHostname,
  handleDeleteChannel,
}: {
  channel: InMemoryChannel;
  companyWebsiteHostname: string;
  handleDeleteChannel: (channel: InMemoryChannel) => void;
}) {
  return (
    <div
      key={channel.name}
      className="border-1 border-divider-weak bg-static-surface-elevated rounded-6 p-4"
    >
      <div className="label-default-regular text-content-moderate">
        <div className="flex justify-between items-start">
          <p className="mb-2 flex flex-row items-center justify-start gap-2">
            <span className="text-content-strong">{channel.name}</span> -{" "}
            <span className="text-static-content-sentiment-positive text-sm">
              {channel.category}
            </span>
          </p>
          <div className="flex flex-row">
            <span
              className="cursor-pointer"
              onClick={() => handleDeleteChannel(channel)}
            >
              <XMarkIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
        <pre className="suisse-mono inline text-xs">
          <code>
            https://{companyWebsiteHostname}?utm_source=
            <span className="text-content-strong">{channel.utmSource}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

function ChannelDefaultCard({ channel }: { channel: DefaultChannel }) {
  return (
    <div
      key={channel.name}
      className="border-1 border-divider-weak bg-static-surface-elevated rounded-6 p-4 break-words"
    >
      <div className="label-default-regular text-content-moderate">
        <p className="mb-2 flex flex-row justify-between">
          <span className="text-content-strong">{channel.name}</span>
          <span className="text-content-weak font-suisse-mono text-xs">
            default
          </span>
        </p>
        <p className="text-xs">{channel.description}</p>
      </div>
    </div>
  );
}
