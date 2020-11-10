defmodule DrawItWeb.Messages do
  @moduledoc """
  Provides user-facing messages.
  """

  @spec not_authorized :: String.t()
  def not_authorized do
    "You must be logged in to view that page"
  end

  @spec password_reset(email :: String.t()) :: String.t()
  def password_reset(email) do
    "Password reset instructions sent! (If #{email} is a real account)"
  end

  @spec invalid_email_or_password :: String.t()
  def invalid_email_or_password do
    "Invalid email/password combination. Try again?"
  end

  @spec user_created :: String.t()
  def user_created do
    "Your account has been created!"
  end

  @spec user_not_created :: String.t()
  def user_not_created do
    "Could not register! See the errors below"
  end

  @spec user_changed :: String.t()
  def user_changed do
    "Account updated!"
  end

  @spec logged_out :: String.t()
  def logged_out do
    "Successfully logged out!"
  end

  @spec password_reset_link_expired :: String.t()
  def password_reset_link_expired do
    "That password reset link has expired"
  end

  @spec user_password_changed :: String.t()
  def user_password_changed do
    "Password changed successfully!"
  end

  @spec user_password_not_changed :: String.t()
  def user_password_not_changed do
    "Password could not be changed!"
  end

  @spec record_not_changed :: String.t()
  def record_not_changed do
    "Changes could not be saved. Try again?"
  end

  @spec record_not_changed(Ecto.Changeset.t()) :: String.t()
  def record_not_changed(%Ecto.Changeset{} = _changeset) do
    "Changes could not be saved. See errors below."
  end

  @spec not_found :: String.t()
  def not_found do
    "Record not found!"
  end

  @spec unknown_error :: String.t()
  def unknown_error do
    "An unknown error has occurred"
  end
end
