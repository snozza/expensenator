require 'spec_helper'

feature 'Homepage' do

  before(:each) do
    visit '/'
  end

  scenario 'has a title' do
    expect(page).to have_title "Expensenator"
  end

  scenario 'has a form to submit an expense' do
    expect(page).to have_selector('form')
  end
end

feature 'Submiting a new expense' do

  before(:each) do
    visit '/'
  end

  scenario 'request summary appears on page after submission', js: true do
    fill_in "amount", with: "1000"
    select("Taxi", from: "category")
    fill_in "description", with: "Needed to get somewhere"
    click_button '#new-expense'
    expect(find('.expense_item').text).to include '1000'
  end

end
