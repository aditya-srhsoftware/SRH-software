"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ArrowRight, Check, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-[3.35rem] w-full rounded-2xl border border-[#E8E8EE] bg-[#F7F5F1] px-4 font-body-poppins text-[0.95rem] text-[#151C4B] outline-none transition-all duration-300 placeholder:text-[#A1A1AA] hover:border-[#D8D8DE] hover:bg-white focus:border-[#E81E62]/45 focus:bg-white focus:shadow-[0_0_0_4px_rgba(232,30,98,0.08)] focus-visible:outline-none touch-manipulation";

const labelClass =
  "mb-2 block font-heading-manrope text-[0.8rem] font-bold tracking-[-0.01em] text-[#151C4B]";

const INTEREST_OPTIONS = [
  { value: "new-product", label: "New product build" },
  { value: "rebuild", label: "Rebuild / modernization" },
  { value: "ai", label: "AI integration" },
  { value: "mobile", label: "Mobile app" },
  { value: "web-app", label: "Web application" },
  { value: "design-system", label: "Design system / UI kit" },
  { value: "cloud", label: "Cloud & infrastructure" },
  { value: "partnership", label: "Dedicated partnership" },
  { value: "audit", label: "Technical audit" },
  { value: "other", label: "Something else" },
] as const;

type InterestValue = (typeof INTEREST_OPTIONS)[number]["value"] | "";

function InterestSelect({
  id,
  name,
  required,
}: {
  id: string;
  name: string;
  required?: boolean;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<InterestValue>("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchedInvalid, setTouchedInvalid] = useState(false);

  const selected = INTEREST_OPTIONS.find((option) => option.value === value);
  const showError = touchedInvalid && !value;

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) {
      return;
    }

    const onSubmit = () => {
      if (!value) {
        setTouchedInvalid(true);
      }
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [value]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const selectedIndex = INTEREST_OPTIONS.findIndex(
      (option) => option.value === value,
    );
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, value]);

  useEffect(() => {
    if (!open || !listRef.current) {
      return;
    }

    const option = listRef.current.children[activeIndex] as
      | HTMLElement
      | undefined;
    option?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const choose = (next: InterestValue) => {
    setValue(next);
    setTouchedInvalid(false);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(INTEREST_OPTIONS.length - 1);
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % INTEREST_OPTIONS.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + INTEREST_OPTIONS.length) % INTEREST_OPTIONS.length,
      );
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(INTEREST_OPTIONS.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(INTEREST_OPTIONS[activeIndex].value);
      return;
    }

    if (event.key === "Escape" || event.key === "Tab") {
      close();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={showError || undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onTriggerKeyDown}
        onBlur={() => {
          if (!value) {
            setTouchedInvalid(true);
          }
        }}
        className={cn(
          fieldClass,
          "flex items-center justify-between gap-3 pr-3.5 text-left",
          open &&
            "border-[#E81E62]/45 bg-white shadow-[0_0_0_4px_rgba(232,30,98,0.08)]",
          showError &&
            "border-[#E81E62]/55 shadow-[0_0_0_4px_rgba(232,30,98,0.1)]",
          !selected && "text-[#A1A1AA]",
        )}
      >
        <span className="truncate">
          {selected?.label ?? "What do you need?"}
        </span>
        <span
          aria-hidden
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[#8B90A0] ring-1 ring-[#E8E8EE] transition-transform duration-300",
            open && "rotate-180 bg-[#151C4B] text-white ring-[#151C4B]",
          )}
        >
          <ChevronDown className="size-3.5" strokeWidth={2.25} />
        </span>
      </button>

      <div
        className={cn(
          "absolute top-[calc(100%+0.45rem)] right-0 left-0 z-30 origin-top transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          data-lenis-prevent
          aria-labelledby={id}
          aria-activedescendant={
            open ? `${listId}-option-${activeIndex}` : undefined
          }
          onKeyDown={onListKeyDown}
          className={cn(
            "max-h-[13.75rem] overflow-y-auto overscroll-contain rounded-2xl border border-[#E8E8EE] bg-white p-1.5",
            "shadow-[0_22px_50px_-24px_rgba(21,28,75,0.45),0_8px_20px_-12px_rgba(21,28,75,0.18)]",
            "[scrollbar-width:thin] [scrollbar-color:#C8CAD4_transparent]",
            "[&::-webkit-scrollbar]:w-1.5",
            "[&::-webkit-scrollbar-track]:my-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C8CAD4]",
            "[&::-webkit-scrollbar-thumb:hover]:bg-[#A8ABB8]",
          )}
        >
          {INTEREST_OPTIONS.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <button
                key={option.value}
                id={`${listId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option.value)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left font-body-poppins text-[0.9375rem] transition-colors duration-150",
                  isActive && !isSelected && "bg-[#F7F5F1] text-[#151C4B]",
                  isSelected && "bg-[#151C4B] text-white",
                  !isActive && !isSelected && "text-[#3F4560]",
                )}
              >
                <span>{option.label}</span>
                {isSelected ? (
                  <Check className="size-3.5 shrink-0 opacity-90" strokeWidth={2.5} />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {showError ? (
        <p className="mt-2 font-body-poppins text-[0.75rem] text-[#E81E62]">
          Please choose what you need help with.
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-[1.5rem] border border-[#ECECEC] bg-[#F7F5F1]/80 px-6 py-8 sm:px-8",
          className,
        )}
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#E81E62]/10 text-[#E81E62] ring-1 ring-[#E81E62]/15">
          <CheckCircle2 className="size-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-heading-manrope text-[1.45rem] font-extrabold tracking-[-0.03em] text-[#151C4B]">
          We’ve got your note.
        </h3>
        <p className="max-w-md font-body-poppins text-[0.95rem] leading-[1.75] text-[#6B7280]">
          Thanks for reaching out. This preview doesn’t send mail yet — connect
          the form to your inbox or API when you’re ready.
        </p>
      </div>
    );
  }

  return (
    <form
      className={cn("grid gap-5 sm:gap-6", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const interest = new FormData(form).get("interest");
        if (!interest) {
          form.querySelector<HTMLButtonElement>("#interest")?.focus();
          return;
        }
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
            placeholder="Alex Rivera"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
            placeholder="alex@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="interest" className={labelClass}>
            Interest
          </label>
          <InterestSelect id="interest" name="interest" required />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="min-h-[8.5rem] w-full resize-y rounded-2xl border border-[#E8E8EE] bg-[#F7F5F1] px-4 py-3.5 font-body-poppins text-[0.95rem] leading-relaxed text-[#151C4B] outline-none transition-all duration-300 placeholder:text-[#A1A1AA] hover:border-[#D8D8DE] hover:bg-white focus:border-[#E81E62]/45 focus:bg-white focus:shadow-[0_0_0_4px_rgba(232,30,98,0.08)] focus-visible:outline-none"
          placeholder="Goals, timeline, links — whatever helps us respond well."
        />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#ECECEC] bg-[#F7F5F1]/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="max-w-[20rem] font-body-poppins text-[0.8125rem] leading-[1.6] text-[#8B90A0]">
          Prefer email?{" "}
          <a
            href="mailto:sales@srhsoftwares.com"
            className="font-semibold text-[#151C4B] transition-colors hover:text-[#E81E62]"
          >
            sales@srhsoftwares.com
          </a>
        </p>
        <button
          type="submit"
          className="group relative inline-flex h-[3.25rem] w-full touch-manipulation items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#151C4B] px-7 text-[0.9375rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(21,28,75,0.55)] transition-all duration-300 hover:bg-[#1B2458] hover:shadow-[0_18px_36px_-14px_rgba(232,30,98,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151C4B] sm:w-auto"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative">Send message</span>
          <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
