import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TextInputGroup } from "@nebula/ui/components";
import { OnboardingLayout } from "@nebula/ui/layouts";
import { Loading } from "@nebula/ui/svgs";
import { ONBOARDING_PATHNAMES } from "@nebula/constants";
import { completeUserFormSchema, type CompleteUserForm } from "@nebula/schemas";
import { api } from "@nebula/utils/api";

export default function RegisterPage() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteUserForm>({
    resolver: zodResolver(completeUserFormSchema),
  });

  const { mutateAsync, isLoading } = api.user.completeUser.useMutation();

  const onSubmit = async (formData: CompleteUserForm) => {
    await mutateAsync(formData);
    push({
      pathname: ONBOARDING_PATHNAMES.EXPLAINED,
    });
  };

  return (
    <OnboardingLayout
      title={<span>Let's create an account</span>}
      description={
        <span>
          Solstice combines traditional attribution technology enriched with
          self-reported attribution tools allowing you to measure both demand
          capture and demand creation.
        </span>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-4 space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
          <TextInputGroup
            fullWidth
            type="text"
            name="firstName"
            label="First Name"
            register={register}
            error={errors.firstName}
          />
          <TextInputGroup
            fullWidth
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
        </div>
        <TextInputGroup
          name="companyRole"
          label="Company role"
          type="text"
          register={register}
          error={errors.companyName}
        />
        <TextInputGroup
          name="companyName"
          type="text"
          label="Company name"
          register={register}
          error={errors.companyName}
        />
        <TextInputGroup
          type="text"
          name="companyWebsiteHostname"
          label="Company website"
          register={register}
          error={errors.companyWebsiteHostname}
        />
        <div>
          <span className="label-mini-regular text-content-moderate">
            By continuing you agree to the Solstice{" "}
            <a
              href="https://getsolstice.com/terms"
              target="_blank"
              rel="noreferrer"
            >
              <span className="link">terms of service</span>
            </a>{" "}
            and{" "}
            <a
              href="https://getsolstice.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              <span className="link">privacy policy</span>
            </a>
            .
          </span>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <Loading className="h-4 w-4 animate-spin" />
            ) : (
              <span>Register</span>
            )}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
