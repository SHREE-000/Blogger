import React from "react";
import { Link } from "react-router-dom";
import {
  ErrorMsg,
  Heading2,
  InputField,
  Label,
  SelectField,
  SubmitButton,
} from "../../atomicComponents";
import "./Style.scss";

export const CreateBlogs = ({ props }) => {
  const {
    heading,
    labelTitle,
    titleValue,
    onChange,
    textType,
    titleIdNameHtml,
    titlePlaceHolder,
    topicIdNameHtml,
    labelTopic,
    topicPlaceHolder,
    topicValue,
    descHtml,
    labelDesc,
    descValue,
    descIdName,
    selectIdNameHtml,
    labelSelect,
    options,
    mediaLabel,
    mediaIdNameHtml,
    mediaValue,
    fileType,
    handleClick,
    submitType,
    buttonName,
    error,
  } = props;

  return (
    <div className="create-blog-outer-box">
      <button>
        <Link className="link-router-dom" to="/showblogs">
          Go To Your Blogs
        </Link>
      </button>
      <Heading2 heading={heading} />
      <form className="container" action="">
        <Label htmlFor={titleIdNameHtml} label={labelTitle} />
        <InputField
          value={titleValue}
          onChange={onChange}
          type={textType}
          id={titleIdNameHtml}
          name={titleIdNameHtml}
          placeholder={titlePlaceHolder}
        />

        <Label htmlFor={topicIdNameHtml} label={labelTopic} />
        <InputField
          value={topicValue}
          onChange={onChange}
          type={textType}
          id={topicIdNameHtml}
          name={topicIdNameHtml}
          placeholder={topicPlaceHolder}
        />

        <Label htmlFor={descHtml} label={labelDesc} />
          <textarea
            id={descIdName}
            name={descIdName}
            className="textareaStyle"
            value={descValue}
            onChange={onChange}
          ></textarea>

        <div className="selectStyle">
          <Label htmlFor={selectIdNameHtml} label={labelSelect} />
          <SelectField
            id={selectIdNameHtml}
            name={selectIdNameHtml}
            className="selectOneStyle"
            options={options}
            onChange={onChange}
          />
        </div>

        <Label htmlFor={mediaIdNameHtml} label={mediaLabel} />
        <InputField
          value={mediaValue}
          onChange={onChange}
          type={fileType}
          id={mediaIdNameHtml}
          name={mediaIdNameHtml}
        />

        {error && <ErrorMsg msg={error} />}

        <SubmitButton
          onClick={handleClick}
          type={submitType}
          name={buttonName}
        />
      </form>
    </div>
  );
};
