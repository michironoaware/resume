﻿import "../styles/SocialIcon.css";
import { SocialDescriptor } from "./SocialDescriptor.ts";
import { RedirectSocialDescriptor } from "./RedirectSocialDescriptor.ts";
import { ClipboardSocialDescriptor } from "./ClipboardSocialDescriptor.ts";
import { useEffect, useId } from "react";
import "styles/Button.css";

export default function SocialIcon(props: ISocialIconProperties)
{
	if (props.social instanceof RedirectSocialDescriptor)
	{
		return <a className="SocialIcon Button" href={props.social.address} target="_blank" rel="noopener noreferrer">
			<img src={props.social.iconSource} alt={props.social.name}/>
		</a>
	} else if (props.social instanceof ClipboardSocialDescriptor)
	{
		const elementId = useId();

		useEffect(() =>
		{
			const copyToClipboardCallback = () =>
				navigator.clipboard.writeText((props.social as ClipboardSocialDescriptor).content).then();

			const socialIconElement = document.getElementById(elementId)!;
			socialIconElement.addEventListener("click", copyToClipboardCallback);

			return () => socialIconElement.removeEventListener("click", copyToClipboardCallback);
		}, []);

		return <div id={elementId} className="SocialIcon Button ClipboardSocialIcon">
			<img src={props.social.iconSource} alt={props.social.name}/>
		</div>
	}
}

export interface ISocialIconProperties
{
	social: SocialDescriptor;
}
