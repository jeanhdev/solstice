import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewChannel, newChannelSchema } from "@solstice/cosmos/tables/channels";
import { addDays, format } from "date-fns";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  ButtonTertiary,
  HorizontalDivider,
  InlineCode,
  SelectInputGroup,
  TextInputGroup,
} from "@nebula/ui/components";
import { SectionLayout } from "@nebula/ui/layouts";
import { useQuerySafely } from "@nebula/hooks";
import { addChannelInput } from "@nebula/server/api/routers/user/inputs";
import { api } from "@nebula/utils/api";

import {
  CreateChannelsSteps,
  useChannelStore,
  useSafeChannel,
} from "../store/createStore";
import { usePreviewUTMPaths } from "../utils";

export default function CreateChannelStepsDispatcher() {
  const { step } = useChannelStore();

  if (step === CreateChannelsSteps.NAME) {
    return <CreateChannelNameStep />;
  }

  if (step === CreateChannelsSteps.PARAMETERS) {
    return <CreateChannelParametersStep />;
  }

  if (step === CreateChannelsSteps.REVIEW) {
    return <CreateChannelReviewStep />;
  }

  if (step === CreateChannelsSteps.CREATED) {
    return <CreateChannelCreatedStep />;
  }

  throw Error("Invalid step");
}

function CreateChannelNameStep() {
  const { setChannel, channel, setStep } = useChannelStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<NewChannel, "name">>({
    resolver: zodResolver(newChannelSchema.pick({ name: true })),
  });

  const onSubmit = (formData: Pick<NewChannel, "name">) => {
    setChannel({ name: formData.name });
    setStep(CreateChannelsSteps.PARAMETERS);
  };

  return (
    <SectionLayout
      title={<>Name</>}
      description={
        <span>
          Start by entering the name of your channel. You can change it anytime.
        </span>
      }
    >
      <form
        className="grid grid-cols-2 items-end gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInputGroup
          label="Name"
          name="name"
          register={register}
          defaultValue={channel?.name || ""}
          error={errors.name}
        />
        <div>
          <Button disabled={!isValid} type="submit" label={<>Continue</>} />
        </div>
      </form>
    </SectionLayout>
  );
}

// function CreateChannelTrackingTypeStep() {
//   const { channel } = useSafeChannel();
//   const { setChannel, setStep } = useChannelStore();

//   const handleListboxChange = (option: Option) => {
//     setChannel({
//       trackingType: option.value as Channel["trackingType"],
//     });
//   };

//   const handleTrackingTypeSubmit = () => {
//     if (!channel.trackingType) return;
//     setStep(CreateChannelsSteps.PARAMETERS);
//   };

//   const handleGoBack = () => {
//     setChannel({ trackingType: undefined });
//     setStep(CreateChannelsSteps.NAME);
//   };

//   return (
//     <SectionLayout
//       title={<>Tracking method for {channel.name}</>}
//       description={
//         <>
//           <div className="flex flex-col gap-4">
//             <span>
//               Solstice has two tracking methods for mapping incoming visits from
//               your website to your channels.
//             </span>
//             <ul className="space-y-2 list-none list-inside">
//               <li>
//                 <p>
//                   <span className="underline text-content-default">
//                     UTM Tracking:
//                   </span>{" "}
//                   when a visitor comes to your website from a search engine.
//                   This method of tracking is well known, and if you used Google
//                   Analytics before, you are probably familiar with it.
//                 </p>
//                 <p className="mt-1">
//                   Channel tracking using{" "}
//                   <InlineCode
//                     code="UTM"
//                     className="text-xs text-content-strong"
//                   />{" "}
//                   include: Paid channels (Google Ads, Facebook Ads, etc.),
//                   Referral, Email, Social...
//                 </p>
//               </li>
//               <li>
//                 <p>
//                   <span className="underline text-content-default">
//                     Website Path Tracking:
//                   </span>{" "}
//                   when a visitor comes to your website on a specific URL path.
//                   We created this channel to make it easier for you to map your
//                   website URLs to channels.
//                   <p className="mt-1">
//                     Channel tracking using
//                     <InlineCode
//                       code="path"
//                       className="text-xs text-content-strong"
//                     />
//                     include: blog, free products, limited time offers...
//                   </p>
//                 </p>
//               </li>
//             </ul>
//             <span>
//               What happens if I created an ad for a free product and there's an
//               overlap between the UTM and path?
//               {/* Both channels will be
//               attributed. It makes sense to say: "I want to know how many
//               visitors have been influenced for my ad and how many came into my
//               free product". */}
//             </span>
//           </div>
//         </>
//       }
//     >
//       <div className="grid items-end gap-4 grid-cols-2">
//         <SelectInputGroup
//           label="Tracking method"
//           name="trackingType"
//           error={undefined}
//           handleListboxChange={handleListboxChange}
//           selectedOption={{
//             label: trackingTypeLabelMap(channel.trackingType),
//             value: trackingTypeLabelMap(channel.trackingType),
//           }}
//           options={[
//             {
//               label: "UTM",
//               value: "UTM",
//             },
//             {
//               label: "Website path",
//               value: "PATH",
//             },
//           ]}
//         />
//         <div className="flex gap-2 items-center">
//           <ButtonTertiary onClick={handleGoBack} label={<>Back</>} />
//           <Button
//             disabled={!channel.trackingType}
//             onClick={handleTrackingTypeSubmit}
//             label={<>Continue</>}
//           />
//         </div>
//       </div>
//     </SectionLayout>
//   );
// }

//

function CreateChannelParametersStep() {
  return <CreateUtmChannelParametersStep />;

  throw Error("Invalid tracking type");
}

function CreateUtmChannelParametersStep() {
  const { data: user } = useQuerySafely.useMe();

  const { channel } = useSafeChannel();

  const { setStep, setChannel } = useChannelStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Pick<NewChannel, "utmSource">>({
    resolver: zodResolver(newChannelSchema.pick({ utmSource: true })),
  });

  const utmSource = watch("utmSource");

  const { previewPaths } = useMemo(
    () =>
      usePreviewUTMPaths({
        basePath: user.companyWebsiteHostname as string,
        utmSource,
      }),
    [utmSource],
  );

  const handleGoBack = () => setStep(CreateChannelsSteps.NAME);

  const onSubmit = (formData: Pick<NewChannel, "utmSource">) => {
    setChannel({
      utmSource: formData.utmSource,
    });

    setStep(CreateChannelsSteps.REVIEW);
  };

  return (
    <SectionLayout title={<p>UTM Tracking parameters</p>}>
      <div className="flex flex-col gap-2  label-default-regular text-content-moderate">
        <span>
          You can now specify{" "}
          <InlineCode
            code="utm_source"
            className="text-content-strong text-sm"
          />{" "}
          the your <span className="text-content-strong">{channel.name}</span>{" "}
          channel.
        </span>
        <span>
          We don't ask you to provide all the <InlineCode code="utm_campaign" />{" "}
          (or any other parameters) as we will automatically detect them for you
          and attribute the revenue on this granularity.
        </span>

        <span>
          Note: if you are using Google Ads, Facebook Ads, or any other
          advertising platform, you should use the same{" "}
          <InlineCode
            code="utm_source"
            className="text-content-strong text-sm"
          />{" "}
          as you are using in your ads.
        </span>
      </div>
      <form
        className="grid grid-cols-2 items-end gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <TextInputGroup
            label="UTM source"
            name="utmSource"
            register={register}
            error={errors.utmSource}
          />
          {/* <span className="flex flex-col gap-1 label-mini-regular text-content-moderate">
            <span>
              https://{user.companyWebsiteHostname}?utm_source=
              <span className="text-content-strong">{utmSource}</span>
            </span>
          </span> */}
        </div>
        <div className="grid grid-cols-buttons gap-3">
          <ButtonTertiary onClick={handleGoBack} label={<>Back</>} />
          <Button type="submit" disabled={!isValid} label={<>Review</>} />
        </div>
      </form>
      {utmSource && (
        <div className="grid grid-cols-1 items-center justify-start gap-4">
          <div className="flex flex-col gap-1">
            {previewPaths?.valid?.map((url) => (
              <div className="flex flex-col gap-1 label-mini-regular text-content-moderate">
                <span>Tracked URL for {channel.name}:</span>{" "}
                <span className="paragraph-small-code text-static-content-sentiment-positive">
                  {url}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {previewPaths?.invalid?.map((url) => (
              <div className="flex flex-col gap-1 label-mini-regular text-content-moderate">
                <span>Untracked URL:</span>{" "}
                <span className="paragraph-small-code text-static-content-sentiment-negative">
                  {url}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionLayout>
  );
}

function CreateChannelReviewStep() {
  const { channel } = useSafeChannel();

  const { setStep } = useChannelStore();

  const { mutateAsync, isLoading } = api.user.addChannels.useMutation({
    onSuccess: (createdChannels) => {
      setStep(CreateChannelsSteps.CREATED);
    },
  });

  const { data: user } = useQuerySafely.useMe();

  const handleGoBack = () => setStep(CreateChannelsSteps.PARAMETERS);

  const handleCreateChannel = () => {
    const result = addChannelInput.safeParse(channel);

    if (result.success) {
      mutateAsync([result.data]);
    }
  };

  return (
    <SectionLayout
      title={<>Review</>}
      description={
        <span>
          Please review your channel information before creating it. You will
          still be able to update any setting afterward.
        </span>
      }
    >
      <div className="border-1 border-divider-weak bg-static-surface-elevated rounded-6 p-4 break-words">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-content-moderate label-default-regular">
              Name
            </span>
            <span className="text-content-strong label-default-regular">
              {channel.name}
            </span>
          </div>
          <HorizontalDivider />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="label-default-regular text-content-moderate">
                Tracking method
              </span>
              <span className="label-default-regula text-content-strong">
                UTM
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label-default-regular text-content-moderate">
                Tracking parameters
              </span>
              <span className="label-default-regular">
                <span>
                  <InlineCode
                    className="text-content-moderate"
                    code={`https://${
                      user.companyWebsiteHostname as string
                    }?utm_source=`}
                  />
                  <InlineCode
                    className="text-content-strong"
                    code={channel.utmSource as string}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <ButtonTertiary
          onClick={handleGoBack}
          disabled={isLoading}
          label={<>Back</>}
        />
        <Button
          onClick={handleCreateChannel}
          isLoading={isLoading}
          label={<>Create channel</>}
        />
      </div>
    </SectionLayout>
  );
}

//

function CreateChannelCreatedStep() {
  const { push } = useRouter();

  const { channel } = useSafeChannel();

  const { resetChannel } = useChannelStore();

  const handleCreateAnotherOne = () => resetChannel();

  const handleRedirectChannels = () => {
    push({ pathname: "/channels" });
  };

  const tomorrowInString = useMemo(() => {
    // Use format() of date-fns and precise the hour and minutes
    return format(addDays(new Date(), 1), "yyyy-MM-dd HH:mm");
  }, []);

  return (
    <SectionLayout
      title={<>New channel created</>}
      description={
        <div className="flex flex-col gap-2">
          <span>
            Solstice will now track and map the corresponding visitors to{" "}
            {channel.name} given your tracking preferences. It will be taken
            into account starting at your next pipeline run scheduled for{" "}
            <InlineCode
              className="text-content-moderate"
              code={tomorrowInString}
            />
            .
          </span>
        </div>
      }
    >
      <div className="flex justify-end gap-3">
        <ButtonTertiary
          onClick={handleCreateAnotherOne}
          label={<>Create another channel</>}
        />
        <Button
          onClick={handleRedirectChannels}
          label={<>Back to channels</>}
        />
      </div>
    </SectionLayout>
  );
}
