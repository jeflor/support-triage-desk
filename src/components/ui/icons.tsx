import { Mail, MessageCircle, Phone, Code, AtSign } from "lucide-react";
import type { Channel, Priority, Sentiment } from "../../data/types";

export const channelIcon: Record<
  Channel,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  email: Mail,
  chat: MessageCircle,
  voice: Phone,
  api: Code,
  social: AtSign,
};

export const channelLabel: Record<Channel, string> = {
  email: "Email",
  chat: "Chat",
  voice: "Voice",
  api: "API",
  social: "Social",
};

export function ChannelIcon({
  channel,
  size = 12,
  className,
}: {
  channel: Channel;
  size?: number;
  className?: string;
}) {
  const Icon = channelIcon[channel];
  return (
    <Icon
      className={className ?? "text-ink-400"}
      style={{ width: size, height: size }}
    />
  );
}

export const priorityClass: Record<Priority, string> = {
  urgent: "text-urgent-700 bg-urgent-50 ring-urgent-500/40",
  high: "text-warning-700 bg-warning-50 ring-warning-100",
  normal: "text-ink-600 bg-ink-100 ring-ink-200",
  low: "text-ink-500 bg-ink-50 ring-ink-200",
};

export const priorityLabel: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  normal: "Normal",
  low: "Low",
};

export const sentimentDot: Record<Sentiment, string> = {
  positive: "bg-success-500",
  neutral: "bg-ink-300",
  frustrated: "bg-warning-500",
  angry: "bg-urgent-500",
};

export const sentimentLabel: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  frustrated: "Frustrated",
  angry: "Angry",
};
