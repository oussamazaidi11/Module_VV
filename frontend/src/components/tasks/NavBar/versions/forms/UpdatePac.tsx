import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import {
  sendTaskSchema,
  type SendTaskFormData,
} from "../../../../../utils/utils";
import { taskID } from "../../../../../Usr";
import { useShowSendVersStore } from "@/store/tasks/store";
import CalendarInput from "@/components/CalendarInput";
import { createVersion, updateVersion } from "@/api/Version";
import {client,collabor} from "../../../../../Usr"
import toast from "react-hot-toast";
import { data } from "react-router-dom";
interface Props {
  verID: string;
  close: () => void;
  update:boolean;
  versionName:string
}
export default function UpdatePac({ verID,close,update,versionName }: Props) {
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SendTaskFormData>({
    resolver: zodResolver(sendTaskSchema),
  });

  /**
   *  ---- HANDLE SUBMISSION ----
   *
   * Schema Documentation
   *
   * Fields:
   *
   * - projectName: string (required)
   *   → Name of the project. Cannot be empty.
   *
   * - packageName: string (required)
   *   → Name of the package. Cannot be empty.
   *
   * - packageLink: string (required, URL)
   *   → Link to the package. Must be a valid URL.
   *
   * - sendAt: Date (required)
   *   → Date when the package should be sent.
   *
   * - expirationDate: Date (optional)
   *   → Date when the package expires (if applicable).
   *
   * - password: string (optional)
   *   → Optional password for securing access.
   *
   * - information: string (optional)
   *   → Additional information or notes about the package.
   */
  const onSubmit = async (data: SendTaskFormData) => {
   const payload = {
    versionName:versionName,
    versionWithResources: false,
    versionWithPackage: true,
    taskID: taskID,

  package: {
    packageName: versionName, // from your form
    packageLink: data.packageLink, // from your form
    metadataPassword: data.password || "", // optional
    metadataText: data.information || "", // optional
    metadataExporationDate: data.expirationDate
      ? data.expirationDate.toISOString()
      : new Date().toISOString(), // always send a valid ISO string
    sentAt: data.sendAt.toISOString(), // always send a valid ISO string
  },
};
console.log(payload)
 try {
    toast.loading("Updating Version",{duration:3000})
    const res = await updateVersion(collabor.id,verID, payload);
    console.log("Version created successfully:", res);
    close();
    toast.success("Updated with success",{duration:1000})
  } catch (error) {
    console.error(error);
    toast.error("enter a valid link")
  }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[32px]  md:w-[571px] w-full   text-md "
    >
      <div>
        <label className="block mb-2 text-white">Project Name</label>
        <input
          {...register("projectName")}
          className="w-full bg-[#17181D] text-white p-4 rounded-lg  hover:cursor-not-allowed"
          value={versionName}
          disabled
         
         
        />
        {errors.projectName && (
          <span className="text-sm text-red-500">
            {errors.projectName.message}
          </span>
        )}
      </div>

      <div>
        <label className="block mb-2 text-white">Package Name</label>
        <input
        
          className="w-full bg-[#17181D] text-white p-4 rounded-lg hover:cursor-not-allowed "
          placeholder="e.g SH010_V001_Plates.zip"
          value={versionName}
          disabled
        />
        
      </div>

      <div>
        <label className="block mb-2 text-white">Package Link</label>
        <input
          {...register("packageLink")}
          className=" bg-[#17181D] text-white p-4 w-full rounded-lg "
          placeholder="https://..."
        />
        {errors.packageLink && (
          <span className="text-sm text-red-500">
            {errors.packageLink.message}
          </span>
        )}
      </div>

      <div className="flex flex-col w-full sm:flex-row gap-[32px] ">
        <div className="flex flex-col w-full">
          <label className="block mb-2 text-white">Send At</label>
          <CalendarInput
            setdate={(value) => {
              setValue("sendAt", new Date(value));
            }}
          />
          {errors.sendAt && (
            <span className="text-sm text-red-500">
              {errors.sendAt.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label className="block mb-2 text-white">
            Expiration Date (Optional)
          </label>
          <CalendarInput
            setdate={(value) => setValue("expirationDate", new Date(value))}
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-white">Password (Optional)</label>
        <input
          type="password"
          {...register("password")}
          className="w-full bg-[#17181D] text-white p-4 rounded-lg "
        />
      </div>

      <div>
        <label className="block mb-2 text-white">Information (Optional)</label>
        <textarea
          {...register("information")}
          className="w-full bg-[#17181D] text-white p-4 rounded-lg  min-h-[100px]"
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end gap-[32px]">
        <button
          onClick={close}
          type="button"
          className=" transition-all px-6 py-2 text-white bg-[#32353b] rounded-lg  hover:opacity-75 cursor-pointer"
        >
          Close
        </button>
        <button
          type="submit"
          className=" transition-all cursor-pointer px-6 py-2 text-white bg-[#5473C1] rounded-lg hover:opacity-75"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}
