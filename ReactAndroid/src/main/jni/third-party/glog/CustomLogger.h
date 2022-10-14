#pragma once

#include <glog/logging.h>

#include <string>
#include <chrono>
#include <thread>
#include <utility>

namespace d11 {

class Logger {
public:
  Logger(const std::string& message) : message_(std::move(message)) {
    LOG(INFO) << "[MAYANT](" << std::this_thread::get_id() << ") start: " << message_ << ",: " << std::chrono::system_clock::now().time_since_epoch() / std::chrono::milliseconds(1);
  }

  ~Logger() {
    LOG(INFO) << "[MAYANT](" << std::this_thread::get_id() << ") end: " << message_ << ", " << std::chrono::system_clock::now().time_since_epoch() / std::chrono::milliseconds(1);
  }

private:
  std::string message_;
};

}
